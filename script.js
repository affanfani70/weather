//key = 852dfd04cb964ccd5315b58660def847

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post('/', (req, res) => {
    const query = req.body.cityName;
    const unit = 'metric';
    const apiKey = '852dfd04cb964ccd5315b58660def847'


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icons = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icons + ".png"

            res.write(`<p>The current weather is ${weatherDiscription} </p>`)
            res.write(`<h2>The temprature of ${query} is ${temp} </h2>`)
            res.write(`<img src=${imgURL} alt="">`)
            res.send();
        })
    })
})
app.listen(3000, () => {
    console.log('Server is listen 3000....');
})