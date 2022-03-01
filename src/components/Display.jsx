import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { kelvinToCelsius, getCurrentdate } from '../utils'

export default function Display({weather, visited, setVisited}) {
  // console.log(weather)
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate()
  // console.log(weather);


  const handleExpand = () => {
    if(visited && visited.indexOf(weather) === -1)
      setVisited([...visited, weather])
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    if(!weather){
      navigate('/')
    }
  }, [weather])


  return (
    <div className="display">   
      <h1>{weather && weather.name}</h1>
      <h2>{getCurrentdate()}</h2>
      <h3>{kelvinToCelsius(weather && weather.main.temp).toPrecision(2)}&deg;C</h3>
      <button onClick={handleExpand}>{!showDetails ? "+" : "-"}</button>
      {showDetails ? 
        <div>
          <div className="weather">
            <span className="climate">{weather && weather.weather[0].description}</span>
            <br />
            <span className="temp">Temperature: {kelvinToCelsius(weather && weather.main.temp).toPrecision(2)}&deg;C</span>
            <br />
            <span className="feelsLike">Feels Like: {kelvinToCelsius(weather && weather.main.feels_like).toPrecision(2)}&deg;C</span>
            <br />
            <span className="min">Low: {kelvinToCelsius(weather && weather.main.temp_min).toPrecision(2)}&deg;C</span> 
            / 
            <span className="max">High: {kelvinToCelsius(weather && weather.main.temp_max).toPrecision(2)}&deg;C</span> 
            <br />
            <span className="wind">Wind Speed: {weather && weather.wind.speed}Km/h</span>
            <br />
            <span className="wind">Wind Direction: {weather && weather.wind.deg}&deg;</span>
            <br />
          </div>
        </div>
        :
        <div>xx</div>
      }
    </div>
  )
}
