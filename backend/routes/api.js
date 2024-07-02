const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const fetchMarketPrices = async () => {
  const MARKET_API_KEY = process.env.MARKET_API_KEY;
  try {
    const response = await axios.get('https://api.example.com/market-prices', { // Replace with the actual API URL
      params: {
        api_key: MARKET_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    throw new Error('Failed to fetch market prices');
  }
};

const fetchWeatherData = async (location) => {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric', // or 'imperial' for Fahrenheit
        cnt: 7, // number of days
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

router.get('/market-prices', async (req, res) => {
  try {
    const prices = await fetchMarketPrices();
    res.json(prices);
  } catch (error) {
    console.error('Error in /market-prices route:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/weather', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const weatherData = await fetchWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    console.error('Error in /weather route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
