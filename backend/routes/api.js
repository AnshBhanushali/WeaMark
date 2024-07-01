const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const MarketPrice = require('../models/MarketPrice');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const scrapeMarketPrices = async () => {
  try {
    const response = await axios.get('https://www.agweb.com/markets');
    const html = response.data;
    const $ = cheerio.load(html);

    const prices = [];
    $('table.market-price-table tr').each((index, element) => {
      if (index === 0) return; // skip header row
      const item = $(element).find('td').eq(0).text().trim();
      const price = parseFloat($(element).find('td').eq(1).text().trim().replace('$', ''));
      prices.push({ item, price });
    });
    return prices;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to scrape market prices');
  }
};


const fetchWeatherData = async (location) => {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric', // or 'imperial' for Fahrenheit
        cnt: 7 // number of days
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data');
  }
};


router.get('/market-prices', async (req, res) => {
  try {
    const prices = await scrapeMarketPrices();
    res.json(prices);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
