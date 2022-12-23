import { useState } from 'react';
//style
import './App.css';
//component
import Search from "./Search/Search";
import Nav from './Nav/Nav';
import CurrentWeather from './Current/CurrentWeather';
//api parameters
import { WeatherApiKey } from './Api/Api';

function App() {

  const [currentWeatherReport, setCurrentWeatherReport] = useState(null);
  const [weatherForecastReport, setWeatherForecastReport] = useState(null);

  const handleSearch = (searchData) => {
    //we take the location data (longitude and latitude)
    //and pass it into the openWeather Api to the the current weather data and weather forecast data
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    const weatherForecastFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    
    Promise.all([currentWeatherFetch, weatherForecastFetch])
    .then(async (response) => {
      const currentWeatherResponse = await response[0].json();
      const weatherForecastResponse = await response[1].json();

      setCurrentWeatherReport({city:searchData.label, ...currentWeatherResponse})
      setWeatherForecastReport({city:searchData.label, ...weatherForecastResponse})
    })
  }

  return (
    <div className="container">
      <img 
        alt='weather' 
        src='https://images.unsplash.com/photo-1523556329929-93033da89632?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        />
      <Nav>LiveWeather</Nav>
      <Search searchBarData={handleSearch}/>
      <div className='weather_data'>
        <div className='weather_data_weather'>
          {currentWeatherReport && <CurrentWeather weatherData={currentWeatherReport}/>}
        </div>
        <div className='weather_data_forecast'>Forecast</div>
      </div>
    </div>
  );
}

export default App;
//react accessible accordion
//react select async paginate