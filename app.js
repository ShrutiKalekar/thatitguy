

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//modules needed for sign up
const path = require('path');
const fetch = require("node-fetch");

const app = express();
app.set('view engine', 'ejs');
//views
app.set('views', path.join(__dirname, './Views'));

//bodyParser use
app.use(bodyParser.urlencoded({extended: true}));

//express access public dir
app.use(express.static(path.join(__dirname, 'public')));


//sign-up get req
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

//sign-up post req
app.post("/",function(req,res){
  const email = req.body.email;
  const password = req.body.password;

  if (!password || !email) {
    res.sendFile(__dirname+"/subscription.html");
    return;
 }

  const data = {
    members:[
      {
        email_address: email,
        status : "subscribed",
      }
    ]
  };

  const jsonData = JSON.stringify(data);





//fetch method - api, list-id , server , method ,success-failure

  fetch('https://us17.api.mailchimp.com/3.0/lists/400cc17159', {
     method: 'POST',
     headers: {
       Authorization: 'auth 9a21f86202150bcb5eb9c884a016d1b0-us17'
     },
     body: jsonData
   })
     .then(res.statusCode === 200 ?
      res.sendFile(__dirname + "/subscription.html"):
      res.sendFile(__dirname + "/failure.html"))
     .catch(err => console.log(err))

  // res.sendFile(__dirname+"/index.html");
 });



//home
app.get("/subscription",function(req,res){
  res.sendFile(__dirname + "/subscription.html");
})


// failure
app.get("/failure",function(req,res){
   res.sendFile(__dirname + "/failure.html")
 });

//payment
app.get("/standard",function(req,res){
  res.sendFile(__dirname+"/standard.html")
})

app.get("/premium",function(req,res){
  res.sendFile(__dirname+"/premium.html")
})

//mainpageabout
app.get("/about",function(req,res){
  res.sendFile(__dirname+"/about.html");
});


//INVESTORS
app.get("/investors",function(req,res){
  res.sendFile(__dirname+"/investors.html")
})

// blogs

let posts = [];

app.get("/blog", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/blog" ,function(req,res){
  res.renderFile(__dirname+"/home");
})

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/blog");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

//contactContent
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

// hr-finance-buiseness

app.get("/hr",function(req,res){
  res.sendFile(__dirname+"/hr.html");
});

app.get("/buiseness",function(req,res){
  res.sendFile(__dirname+"/buiseness.html");
});


app.get("/finance",function(req,res){
  res.sendFile(__dirname+"/finance.html");
});


//listen method
app.listen(process.env.PORT || 4131 , function() {
  console.log("Server started on port 4131");
});
