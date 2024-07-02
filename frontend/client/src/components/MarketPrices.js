import React from 'react';

function MarketPrices({ prices }) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Market Prices</h2>
      <div>
        {prices.map((price) => (
          <div key={price._id} className="border border-green-300 bg-green-50 p-4 rounded mb-4 shadow">
            <p className="text-green-800 font-semibold">Item: {price.item}</p>
            <p className="text-green-600">Price: ${price.price.toFixed(2)}</p>
            <p className="text-green-600">Date: {new Date(price.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPrices;
