const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const MarketPrice = require('../models/MarketPrice');
const router = express.Router();

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

router.get('/market-prices', async (req, res) => {
  try {
    const prices = await scrapeMarketPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
