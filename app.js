//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require('mongoose');

var posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Welcome! </br></br> This is a daily journal web app in which you can record the details of your everyday life. </br></br> This website is created using express.js, css, bootstrap and uses mongoDB as the database. </br></br> I really hope you like this project.";
const contactContent = "I am a Second year computer science student. </br></br> You can contact me at: <em>gauravg@my.yorku.ca</em>";

const app = express();

mongoose.connect("mongodb://localhost:27017/postDB", {useNewUrlParser: true});

const dbscheme = {
  title: String,
  content: String,
}

const Post = mongoose.model("Post", dbscheme);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  

  Post.find({}, function(err, foundData){
    if(!err){
      res.render('home', {homeContent: homeStartingContent, post: foundData});
    }else{
      console.log(err);
    }
  })

})

app.get('/about', function(req, res){
  res.render('about', {aboutData: aboutContent});
})

app.get('/contact', function(req, res){
  res.render('contact', {contactData: contactContent});
})

app.get('/compose', function(req, res){
  res.render('compose');
})

app.get('/posts/:postId', function(req, res){

  //const reqParam = lodash.lowerCase(req.params.anotherPost);
  const reqPostId = req.params.postId;

  Post.findOne({_id: reqPostId}, function(err, post){
    if(!err){
      res.render('post', {postTitle: post.title, postContent: post.content});
    }
  })
})

app.post('/compose', function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save();

  res.redirect('/');
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});