/*********************************************************************************
* BTI425 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Alex Cucos Student ID: 044226090 Date: 02/23/2022
* Heroku Link: https://acucos-react-weather-app.herokuapp.com/
*
********************************************************************************/
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Searchbar from "./components/Searchbar"
import LocationList from './components/LocationList'
import Display from './components/Display'
import DisplayVisited from './components/DisplayVisited'
// import cityJSON from './city.list.json'
import './App.css';
//d030e35a8156d1eb0017ec7da491a4b0
// const OPEN_WEATHER_KEY = 'ed7b4eecbe0c58373393d2c6f8ab5ec2'
// const OPEN_WEATHER_KEY = 'd030e35a8156d1eb0017ec7da491a4b0'
const OPEN_WEATHER_KEY = 'a6152bd209b07d413fc266b55624d02a'

function App() {
  const [coords, setCoords] = useState({})
  const [localWeather, setLocalWeather] = useState({})
  const [visited, setVisited] = useState([])
  const [finalSearch, setFinalSearch] = useState("")
  const [finalWeatherList, setFinalWeatherList] = useState([])
  const [loading, setLoading] = useState(true)
  const [cities, setCities] = useState(null)

  const getCityList = async () => {
      if(!cities){
        console.log("importing city id list")
        let request = await fetch('../city.list.json')
        try {
          let data = await request.json()
          setCities(data);
        } catch (error) {
          console.log(error)
        }
      }
  }

  useEffect(() => {
    getCityList()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const fetchCities = async (cityName) => {
      console.log('searching city Ids for <' + cityName + '>')
      let matches = []
      if(cities && cityName.length > 1){
        cities.forEach(city => {
          if(city.name.match(cityName)){
            matches.push(city.id)
          }
        })
      }
      // console.log(cities);
      //setCityIdList([...matches])
      
      let weatherData = []
      await Promise.all(matches.map(async (cityId) => {
        try {
          let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${OPEN_WEATHER_KEY}`)
          let data = await request.json()
          let error = request.status !== 200 ? {name: cityId, err: "Failed to fetch city data"} : null
          let cityData = request.status === 200 ? data : null
          weatherData.push({
            cityData, 
            error
          })
          // let data = {main : 

          
        } catch (error) {
          console.log(error)
        }
        
      }))
      // console.log(weatherData);
      // if(weatherData.length == 0){
      //   setFailedFetch(true)
      // }
      setFinalWeatherList(weatherData)
      setLoading(false)
      
    }
    // console.log('fetching')
    fetchCities(finalSearch)
  }, [finalSearch, cities])
  
  //UseEffect
  useEffect(() => {

    //Enable Geolocation & get current coords
    const getGeoLocation = async () => {
      if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
          setCoords({lat: position.coords.latitude, lon: position.coords.longitude})
          // console.log(position)
        })
      }
      else{
        alert('Please enable geolocation for full functionality')
        
      }
    }
    //Fetch local weather data
    const getLocalWeather = async () => {
      try {
        // console.log(coords.lat, coords.lon)
        console.log("Getting Local Weather...");
        if(coords.lat && coords.lon){
          let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${OPEN_WEATHER_KEY}`)
          let weatherData = await request.json()
          // let weatherData = {main : {temp: 273, temp_min: 273, temp_max: 273, feels_like: 273}, wind: {speed: 50, deg: 40}, name: "Test", weather: [{description: "Cloudy Overcast"}]}
          let weather = {cityData: weatherData}
          setLocalWeather(weather)
          // console.log(weatherData)
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
    getGeoLocation()
    getLocalWeather()

  }, [coords.lat, coords.lon]) 

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar visited={visited}/>
        <Searchbar setFinalSearch={setFinalSearch}/>
        <Routes>
          <Route path="/" element={localWeather.cityData ? <Display weather={localWeather}/> : <div>Loading...</div>}/>
          <Route path="/search/:id" element={finalWeatherList.length === 0 ? <div className="loading">Loading...</div> : <LocationList visited={visited} setVisited={setVisited} weatherList={finalWeatherList}/>}  />
          <Route path="/visited/:id" element={loading ? <div>Loading...</div> : <DisplayVisited visited={visited} setVisited={setVisited}/>}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
