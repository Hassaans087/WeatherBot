const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

const OPENWEATHER_API_KEY = 'bb85e1457df21d7ddcb4b7ddf17ca34f';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const intent = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;
    const city = parameters['geo-city'];
    const date = parameters['date']; // Not used directly here

    // ✅ Handle Welcome Intent and return immediately
    if (intent === 'Default Welcome Intent') {
        return res.json({
            fulfillmentText: "Hi! I’m Weather Bot. How can I help you today?"
        });
    }

    let weatherInfo = '';

    try {
        if (intent === 'GetCurrentWeather') {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );
            const data = response.data;
            weatherInfo = `It's currently ${data.main.temp}°C in ${city} with ${data.weather[0].description}.`;

        } else if (intent === 'GetForecastWeather') {
            console.log('Intent: GetForecastWeather');
            console.log('City:', city);

            // Get city coordinates
            const geoRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`
            );
            const { lat, lon } = geoRes.data.coord;

            // Get forecast data
            const forecastRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`
            );

            if (forecastRes.data.daily && forecastRes.data.daily.length > 0) {
                weatherInfo = `Here is the 7-day forecast for ${city}:\n`;
                forecastRes.data.daily.slice(0, 7).forEach((day) => {
                    const dateStr = new Date(day.dt * 1000).toDateString();
                    const temp = day.temp.day;
                    const desc = day.weather[0].description;
                    weatherInfo += `${dateStr}: ${temp}°C with ${desc}\n`;
                });
            } else {
                weatherInfo = `Sorry, I couldn't get a forecast for ${city}. Please try again later.`;
            }
        }

        res.json({
            fulfillmentText: weatherInfo
        });

    } catch (error) {
        console.error('Error fetching weather:', error.response ? error.response.data : error.message);
        res.json({
            fulfillmentText: "Sorry, I couldn't fetch the weather right now. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
