var path = require('path');
const express = require('express');
//const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});

// app.get('/test', function (req, res) {
//   res.send(mockAPIResponse);
// });

const API_KEY = process.env.API_KEY;
const fetch = require('node-fetch');
const classification = {};
app.post('/api', function (req, res) {
  let text = req.body.txt;
  console.log(text);
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
