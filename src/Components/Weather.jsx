import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import loupe from '../assets/loupe.png';
import cloudy from '../assets/cloudy.png';
import fog from '../assets/fog.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import snowy from '../assets/snowy.png';
import storm from '../assets/storm.png';
import sunny from '../assets/sunny.png';
import wind from '../assets/wind.png';
import humidity from '../assets/humidity.png';
const Weather = () => {


  const inputRef=useRef()


  const [weatherdata,setweatherdata]=useState(false);
  const allicons={
    "01d":sunny,
    "01n":sunny,
    "02d":cloudy,
    "02n":cloudy,
    "03d":cloudy,
    "03n":cloudy,
    "04d":cloudy,
    "04n":cloudy,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "11d":storm,
    "11n":storm,
    "13d":snow,
    "13n":snowy,
    "50d":fog,
    "50n":fog,

  }

  const search=async(city)=>{

    if(city=== ""){
      alert("Enter City Name");
      return;
    }

    try {

      const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
      const apikey="024769b0a63d9166881a2ef45225b5ca";

      const responses=await fetch(apiurl+city+`&appid=${apikey}`);
      const data= await responses.json();

      if(!responses.ok){
        alert(data.message);
        return;
      }

      console.log(data);

      const icon=allicons[data.weather[0].icon] || sunny;

      setweatherdata({
        humidity: data.main.humidity,
        windspeed: Math.floor(data.wind.speed),
        tempurature: Math.floor(data.main.temp),
        maxtemp: Math.floor(data.main.temp_max),
        mintemp: Math.floor(data.main.temp_min),
        feels: Math.floor(data.main.feels_like),
        loc: data.name,
        wicon: icon,
        wstatus: data.weather[0].description, // Have to keep eye on it not working properly.
      })
    } catch (error) {
      console.error("An error occured while fetching data");
    }
  }

  useEffect(()=>{
    search("Kolkata");
  },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={loupe} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      <img src={weatherdata.wicon} alt=""  className='weather-icon'/>
      <p className='w-status'>{weatherdata.wstatus}</p>
      <p className='temp'>{weatherdata.tempurature} °c</p>
      <p className='feels-like'>Feels Like : {weatherdata.feels} °c</p>
      <p className='max-min'>Max : {weatherdata.maxtemp} °c & Min : {weatherdata.mintemp} °c</p>
      <p className='location'>{weatherdata.loc}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>{weatherdata.windspeed} KM/H</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
