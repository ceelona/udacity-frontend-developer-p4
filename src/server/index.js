const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const apiKey = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

const port = 8081;
const base = '/api';

app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
});

app.post(base, async (req, res) => {
    try {
        const response = await axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${req.body.url}`);
        res.send(response.data);
    } catch(err) {
        console.error(err);
        res.send(err)
    }
})
