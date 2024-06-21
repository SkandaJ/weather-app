import React from 'react';
import "./current-weather.css"; 

const CurrentWeather = ({ data }) => {
  const { city, weather, main, wind } = data;

  if (!data) return null;

  return (
    <div className="weather">
      <div className="top">
        <p className="city">{city}</p>
        <p className="description">{weather && weather[0].description}</p>
      </div>

      <div className="bottom">
        <p className="temperature">{main && `${Math.round(main.temp - 273.15)}°C`}</p>
        <p className="description">{weather && weather[0].description}</p>
        <div className="details-row">
          <span>Feels like </span>
          <span>{main && `${Math.round(main.feels_like - 273.15)}°C`}</span>
        </div>
        <div className="details-row">
          <span>Wind </span>
          <span>{wind && `${wind.speed} m/s`}</span>
        </div>
        <div className="details-row">
          <span>Humidity </span>
          <span>{main && `${main.humidity}%`}</span>
        </div>
        <div className="details-row">
          <span>Pressure </span>
          <span>{main && `${main.pressure} hPa`}</span>
        </div>
      </div>

      <img alt="Weather" className="weather-icon" src={`icons/${weather && weather[0].icon}.png`} />
    </div>
  );
};

export default CurrentWeather;
