

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//modules needed for sign up
const path = require('path');
const fetch = require("node-fetch");

const app = express();
app.set('view engine', 'ejs');

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
    res.sendFile(__dirname+"/signup.html");
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

//BLOG
app.get("/blog",function(req,res){
  res.sendFile(__dirname + "/blog.html")
})

//aboutus
app.get("/aboutus",function(req,res){
  res.sendFile(__dirname+"/aboutus.html")
})

//INVESTORS
app.get("/investors",function(req,res){
  res.sendFile(__dirname+"/investors.html")
})

//listen method
app.listen(4131, function() {
  console.log("Server started on port 4131");
});
