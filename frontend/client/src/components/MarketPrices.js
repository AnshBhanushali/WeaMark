import React from 'react';

function MarketPrices({ prices }) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Market Prices</h2>
      <div>
        {prices.map((price) => (
          <div key={price._id} className="border p-2 mb-2">
            <p>Item: {price.item}</p>
            <p>Price: ${price.price}</p>
            <p>Date: {new Date(price.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPrices;
