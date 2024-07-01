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
      const response = await axios.get(`/api/weather`, { params: { location } });
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarketPrices = async () => {
    try {
      const response = await axios.get('/api/market-prices');
      setMarketPrices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather and Market Prices</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="border p-2 mb-4"
      />
      <button onClick={fetchWeather} className="bg-blue-500 text-white px-4 py-2 rounded">Get Weather</button>
      {weather && <Weather data={weather} />}
      <MarketPrices prices={marketPrices} />
    </div>
  );
}

export default App;
