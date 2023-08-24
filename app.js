//key = 852dfd04cb964ccd5315b58660def847

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const date = require("./date");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let city = 'kasur';
    
    const unit = 'metric';
    const apiKey = '852dfd04cb964ccd5315b58660def847'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            try {
                const weatherData = JSON.parse(data)
            const icon = weatherData.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/" + icon + ".png";
            let day = date();

            const option = {
                country:  weatherData.sys.country,
                city: weatherData.name,
                temprature: weatherData.main.temp,
                condition: weatherData.weather[0].main,
                url: iconURL,
                date: day,
                FeelLike:weatherData.main.feels_like,
                Humidity:weatherData.main.humidity,
                Description:weatherData.weather[0].description
            }
            res.render('index', option)
            } catch (error) {
                console.log(error)
            }
            
        })
    })
})
app.post('/', (req, res) => {
    let city = req.body.inpTxt;
    const unit = 'metric';
    const apiKey = '852dfd04cb964ccd5315b58660def847'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
 https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const icon = weatherData.weather[0].icon
    try {
         const iconURL = "https://openweathermap.org/img/wn/" + icon + ".png";
            let day = date();

            const option = {
                country:  weatherData.sys.country,
                city: weatherData.name,
                temprature: weatherData.main.temp,
                condition: weatherData.weather[0].main,
                url: iconURL,
                date: day,
                FeelLike:weatherData.main.feels_like,
                Humidity:weatherData.main.humidity,
                Description:weatherData.weather[0].description
            }
            res.render('index', option)
    } catch (error) {
        console.log(error)
    }
   
           
        })
    })
})




app.listen(5000, () => {
    console.log("server is running at 5000....")
})