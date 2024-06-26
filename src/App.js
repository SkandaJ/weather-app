import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import ForecastWeather from './components/forecast/forecast';
import { WEATHER_URL, WEATHER_API_KEY } from './api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const body = document.body;
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      body.style.backgroundColor = 'rgba(255, 223, 186, 0.85)'; 
    } else if (hour >= 12 && hour < 18) {
      body.style.backgroundColor = 'rgba(255, 255, 204, 0.85)';
    } else {
      body.style.backgroundColor = 'rgba(0, 51, 102, 0.85)'; 
    }
  }, []); 

  
  useEffect(() => {
    const getWeatherData = async (lat, lon) => {
      try {
        setLoading(true);
        const currentWeatherResponse = await fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
        const forecastResponse = await fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        setCurrentWeather({ city: currentWeatherData.name, ...currentWeatherData });
        setForecast({ city: currentWeatherData.name, ...forecastData });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    const fetchLocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchLocationAndWeather();
  }, []);

  const handleOnSearchChange = async (searchData) => {
    try {
      setLoading(true);
      const [lat, lon] = searchData.value.split(" ");

      const currentWeatherResponse = await fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
      const forecastResponse = await fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();
      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {loading ? (
        <div className="skeleton" style={{ height: '100px', marginBottom: '20px' }}></div>
      ) : (
        <>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecastData && <ForecastWeather data={forecastData} />}
        </>
      )}
    </div>
  );
}

export default App;
