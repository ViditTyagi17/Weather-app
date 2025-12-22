import React, { useEffect } from 'react'
import SearchBar from '../Components/SearchBar'
import WeatherCard from '../Components/WeatherCard'
import ForecastCard from '../Components/ForecastCard'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearWeather, fetchWeather } from '../features/weather/weatherSlice'
function SearchResult() {
 const dispatch=useDispatch()
  const {city}=useParams()


  useEffect(()=>{
    dispatch(clearWeather())
dispatch(fetchWeather(city))

  },[city,dispatch])
  return (
    <div>
      <SearchBar showPin={true} />
       <WeatherCard />
      <ForecastCard />
    </div>
  )
}

export default SearchResult
