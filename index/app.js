const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

const app=express();


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/Person_db", {useNewUrlParser: true});

const form_schema=mongoose.Schema({

  first:String,
  last:String,
  email:String,

});



const Form=mongoose.model('User',form_schema);


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
console.log(req.body.first+""+req.body.last+""+req.body.email);
const user=new Form({
  first:req.body.first,
  last:req.body.last,
  email:req.body.email
});
user.save();
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "mailiud",
//     pass: 'fknj'
//   }
// });
// var mailOptions = {
//   from: 'rgorle5@gmail.com',
//   to: 'ravikumargorle019@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log("error");
//   } else {
//     console.log('Email sent:');
//   }
// });

res.redirect("/");
});

app.get("/search", function(req,res){
  res.sendFile(__dirname+"/search.html");
})

app.post("/search", function(req,res){
  Form.findOne({first:"RAVI"},function(err, find){
    res.send(find.last);
  });
});


app.listen(3000);
