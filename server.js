// server.js
// where your node app starts

// init project
var mongo = require('mongodb').MongoClient;
var urlMongo = process.env.mongoDatabase;
var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var lastName;
var firstName;
var country;
var subject;
var formName;
var oOne;
var oTwo;
var desc;
var newFormTemp

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.gmailid,
        pass: process.env.gmailpwd
    }
});

const mailOptions = {
  from: process.env.gmailid, // sender address
  to: process.env.gmailidrec, // list of receivers
  subject: 'VoterPro Response or Critique', // Subject line
  html: '<p>Your html here</p>'// plain text body
};



//input new form into mlab
function newForm(req, res){
  /*formName = req.query.pollName;
  oOne = req.query.oOne;
  oTwo = req.query.oTwo;
  desc = req.query.description;*/
  //setup form
  newFormTemp = {
  "name": req.query.pollName,
  "oOne": {
    "title": req.query['1O'],
    "votes": 0
  },
  "oTwo": {
    "title": req.query['2O'],
    "votes": 0
  },
  "desc": req.query.description
};
  console.log(JSON.stringify(newFormTemp));
  //insert form into database
  //connect to mongodb and insert new file
  mongo.connect(urlMongo, function(err, client){
      if (err) throw err;
      var db = client.db('voterpro');
      var surveys = db.collection('surveys');
      surveys.insert(newFormTemp);    
      client.close();
  });
  res.sendFile(__dirname + '/views/formsubmitted.html');
}

//connect to mongodb and insert new file




// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get("/about.html", function (request, response) {
  response.sendFile(__dirname + '/views/about.html');
});
app.get("/graphs.html", function (request, response) {
  response.sendFile(__dirname + '/views/graphs.html');
});
app.get("/search.html", function (request, response) {
  response.sendFile(__dirname + '/views/search.html');
});
app.get("/users.html", function (request, response) {
  response.sendFile(__dirname + '/views/users.html');
});
app.get('/form-maker.html', function(req, res){
    res.sendFile(__dirname + '/views/form-maker.html');
});
//good above
app.use("/sourcesubmit", function(request, response){
  lastName = request.query.lastname;
  firstName = request.query.firstname;
  subject = request.query.subject;
  country = request.query.country;
  console.log(lastName, firstName, subject, country);
  mailOptions.html = "<p>" + "Name: " + firstName + " " + lastName + "<br/>" + "Subject: " + subject + "<br/>" + "Country: " + country + "<br/>" + "END" + "</p>";
  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
  //https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799
  response.end("<html><body style='background-color: black'><h1 style='color: white; text-align: center; margin-top: 200'>Response sent- thank you!</h1><center><img src='https://media.mnn.com/assets/images/2013/05/grumpyCatComplain.jpg.838x0_q80.jpg'/></center></body></html>");
});
app.use("/newform",function(req, res){
  newForm(req, res);
  //res.sendFile(__dirname + '/views/users.html');
});


//good below
app.use(function(req, res){
    res.sendFile(__dirname + '/views/404.html');
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
