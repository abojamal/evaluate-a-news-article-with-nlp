var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(' listening on port 8081!');
});

const API_KEY = process.env.API_KEY;
const fetch = require('node-fetch');
const classification = {};
app.post('/api', function (req, res) {
  let text = req.body.txt;
  fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&txt=${text}&model=general`
  )
    .then((data) => data.json())
    .then(function (data) {
      classification.agreement = data.agreement;
      classification.subjectivity = data.subjectivity;
      res.send(classification);
    });
});
