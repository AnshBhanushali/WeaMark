import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import MarketPrices from './components/MarketPrices';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather`, { params: { location } });
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarketPrices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/market-prices');
      setMarketPrices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-6">Weather and Market Prices</h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="border border-green-300 p-3 rounded mb-4 w-full"
          />
          <button
            onClick={fetchWeather}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Get Weather
          </button>
        </div>
        {weather && (
          <div className="mt-6">
            <Weather data={weather} />
          </div>
        )}
        <div className="mt-6">
          <MarketPrices prices={marketPrices} />
        </div>
      </div>
    </div>
  );
}

export default App;
