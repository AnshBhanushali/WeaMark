import React from 'react';

function Weather({ data }) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Weather Forecast</h2>
      <div>
        {data.list.map((forecast) => (
          <div key={forecast.dt} className="border border-green-300 bg-green-50 p-4 rounded mb-4 shadow">
            <p className="text-green-800 font-semibold">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p className="text-green-600 capitalize">{forecast.weather[0].description}</p>
            <p className="text-green-600">Max: {forecast.main.temp_max}°C</p>
            <p className="text-green-600">Min: {forecast.main.temp_min}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
