import { useState, useEffect } from 'react';
//style
import './App.css';
//component
import Search from "./Search/Search";
import Nav from './Nav/Nav';
import CurrentWeather from './Current/CurrentWeather';
import WeatherForecast from './Forecast/WeatherForecast';
//api parameters
import { WeatherApiKey, WeatherAPiUrl} from './Api/Api';

function App() {

  const [currentWeatherReport, setCurrentWeatherReport] = useState(null);
  const [weatherForecastReport, setWeatherForecastReport] = useState(null);
  const [defaultWeatherReport, setDefaultWeatherReport] = useState(null);
  const [defaultForecastReport, setDefaultForecastReport] = useState(null);

  useEffect(()=>{
    defaultWeather()
  }, [])

  const handleSearch = (searchData) => {
    //we take the location data (longitude and latitude)
    //and pass it into the openWeather Api to the the current weather data and weather forecast data
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`${WeatherAPiUrl}weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    const weatherForecastFetch = fetch(`${WeatherAPiUrl}forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`);
    
    Promise.all([currentWeatherFetch, weatherForecastFetch])
    .then(async (response) => {
      const currentWeatherResponse = await response[0].json();
      const weatherForecastResponse = await response[1].json();

      setCurrentWeatherReport({city:searchData.label, ...currentWeatherResponse})
      setWeatherForecastReport({city:searchData.label, ...weatherForecastResponse})
    })
  }

  //default  weather fetch
  const defaultWeather = () => {
    //lon 55.4797
    //lat 25.3994
    
    const defaultLat = 25.3994;
    const defaultLon = 55.4797
  
    const currentWeatherFetch = fetch(`${WeatherAPiUrl}/weather?lat=${defaultLat}&lon=${defaultLon}&appid=${WeatherApiKey}&units=metric`);
    const WeatherForecastFetch = fetch(`${WeatherAPiUrl}/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${WeatherApiKey}&units=metric`)
    
    Promise.all([currentWeatherFetch, WeatherForecastFetch])
    .then(async (response) => {
      const defaultWeatherResponse  = await response[0].json();
      const defaultForecastResponse  = await response[1].json();

      setDefaultWeatherReport({city: 'Ajman, AE', ...defaultWeatherResponse});
      setDefaultForecastReport({city: 'Ajman, AE', ...defaultForecastResponse});

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
          {(currentWeatherReport !== null)  ? <CurrentWeather weatherData={currentWeatherReport}/> : ( defaultWeatherReport && <CurrentWeather weatherData={defaultWeatherReport}/>)}
        </div>
        <div className='weather_data_forecast'>
          {(weatherForecastReport !== null) ? <WeatherForecast weatherData={weatherForecastReport}/>: (defaultForecastReport && <WeatherForecast weatherData={defaultForecastReport}/>)}
          </div>
      </div>
    </div>
  );
}

export default App;
//react accessible accordion
//react select async paginate