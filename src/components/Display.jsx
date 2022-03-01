import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { kelvinToCelsius, getCurrentdate } from '../utils'

export default function Display({weather, visited, setVisited}) {
  // console.log(weather)
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate()


  const handleExpand = () => {
    console.log(visited);
    if(visited && visited.indexOf(weather) === -1)
      setVisited([...visited, weather])
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    // if(!weather){
    //   navigate('/')
    // }

  }, [weather, navigate])


  return (
    <div className="display">   
      {weather.error ?
      <>
        <h1>Error</h1>
        <h2>{getCurrentdate()}</h2>
      </>
      :
      <>
        {console.log(weather)}
        <h1>{weather.cityData && weather.cityData.name}</h1>
        <h2>{getCurrentdate()}</h2>
        <h3>{kelvinToCelsius(weather.cityData && weather.cityData.main.temp).toPrecision(2)}&deg;C</h3>
        <button onClick={handleExpand}>{!showDetails ? "+" : "-"}</button>
      </>
      }

      
      {showDetails ? 
        <div>
          <div className="weather">
            <span className="climate">{weather.cityData && weather.cityData.weather[0].description}</span>
            <br />
            <span className="temp">Temperature: {kelvinToCelsius(weather.cityData && weather.cityData.main.temp).toPrecision(2)}&deg;C</span>
            <br />
            <span className="feelsLike">Feels Like: {kelvinToCelsius(weather.cityData && weather.cityData.main.feels_like).toPrecision(2)}&deg;C</span>
            <br />
            <span className="min">Low: {kelvinToCelsius(weather.cityData && weather.cityData.main.temp_min).toPrecision(2)}&deg;C</span> 
            / 
            <span className="max">High: {kelvinToCelsius(weather.cityData && weather.cityData.main.temp_max).toPrecision(2)}&deg;C</span> 
            <br />
            <span className="wind">Wind Speed: {weather.cityData && weather.cityData.wind.speed}Km/h</span>
            <br />
            <span className="wind">Wind Direction: {weather.cityData && weather.cityData.wind.deg}&deg;</span>
            <br />
          </div>
        </div>
        :
        <div></div>
      }
    </div>
  )
}
