const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    item: String,
    price: Number,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);