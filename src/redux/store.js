import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/auth/authSlice";
import weatherreducer from "../features/weather/weatherSlice"
import historyreducer from "../features/History/historySlice"
import pinnedWeatherCitiesReducer from '../features/weather/pinnedWeatherSlice'
import themeReducer from "../features/mode/themeSlice"
import pinnedCitiesListReducer from "../features/weather/pinnedCitiesSlice";


const store = configureStore({


  reducer:{
    auth:authreducer,
    weather:weatherreducer,
    history:historyreducer,
    pinnedCitiesList:pinnedCitiesListReducer,
    pinnedCitiesWeather:pinnedWeatherCitiesReducer,
    theme:themeReducer
  }

})

export default store