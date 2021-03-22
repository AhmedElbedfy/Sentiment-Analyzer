require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const axios = require("axios");

const PORT = 8081;

const app = express();

// middle ware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/test', async (req, res) => {
    try {

        const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1';
        const API_KEY = process.env.API_KEY;

        const url = `${BASE_API_URL}?key=${API_KEY}&url=${req.body.url}&lang=en`;
        const apiResponse = await axios.get(url);


        const { agreement, subjectivity, confidence, irony } = apiResponse.data;
        const text = apiResponse.data.sentence_list[0].text;
        const score_tag = apiResponse.data.sentence_list[0].text;

        res.send({
            agreement,
            subjectivity,
            confidence,
            irony,
            text,
            score_tag
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error: " + err);
    }
});

app.get('/mock-api', function (req, res) {
    res.send(mockAPIResponse)
})

app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
    console.log(`http://localhost:${PORT}/`)
})

module.exports = app;