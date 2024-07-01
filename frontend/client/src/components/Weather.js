import React from 'react';

function Weather({ data }) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Weather Forecast</h2>
      <div>
        {data.list.map((forecast) => (
          <div key={forecast.dt} className="border p-2 mb-2">
            <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p>{forecast.weather[0].description}</p>
            <p>Max: {forecast.main.temp_max}°C</p>
            <p>Min: {forecast.main.temp_min}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
