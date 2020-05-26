const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var aylien = require("aylien_textapi");

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

// var json = {
//     'title': 'test json response',
//     'message': 'this is a message',
//     'time': 'now'
// }

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//console.log(`Your API key is ${process.env.API_KEY}`);

let projectData = [];

app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
    console.log('1');
}

app.post('/nlp', addSentiment);

function addSentiment(req, res) {
    const input = req.body.url;
    console.log(input);
    console.log('2');
    textapi.sentiment({
        'url': input,
    },
        function (error, response) {
            if (error === null) {
                newSentiment = {
                    "polarity": response.polarity,
                    "subjectivity": response.subjectivity,
                    "text": response.text,
                    "polarity_confidence": response.polarity_confidence,
                    "subjectivity_confidence": response.subjectivity_confidence
                }
                projectData.push(newSentiment);
                res.send(projectData);
                console.log('3');
                console.log(projectData);
                console.log('3');
                
            }
        })
}
