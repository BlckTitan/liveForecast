import React from 'react';
//style
import './style/currentWeather.scss';


export default function CurrentWeather({weatherData}) {
  return (
    <div className='current_weather_container'>
      <div className="top">
        <div className='weather_header'>
          <p className="city">{weatherData.city}</p>{console.log(weatherData)}
          <p className="weather_description">{weatherData.weather[0].description}</p>
        </div>
        <div className='img'>
          <img alt="weather" className="weather_icon" src={require(`../icons/${weatherData.weather[0].icon}.png`)} />
        </div>
      </div>
      <div className="bottom">
        <p className="temprature">{Math.round(weatherData.main.temp)}°C</p>
        <div className="details">
          <div className="parameter_row">
            <span className="parameter_label title">DETAILS</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Feels like</span>
            <span className="parameter_value">{Math.round(weatherData.main.feels_like)} °C</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Wind</span>
            <span className="parameter_value">{weatherData.wind.speed} m/s</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Humidity</span>
            <span className="parameter_value">{weatherData.main.humidity} %</span>
          </div>
          <div className="parameter_row">
            <span className="parameter_label">Pressure</span>
            <span className="parameter_value">{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}