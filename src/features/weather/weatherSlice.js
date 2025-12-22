import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getWeatherForecast } from './weatherAPI'

import { addCity } from "../History/historySlice";


export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { dispatch, rejectWithValue }) => {
    try {

      const data = await getCurrentWeather(city)

      if (data.cod === "404") {
        return rejectWithValue("City not found");
      }
      dispatch(addCity(city))
      return data

    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }

      return rejectWithValue("Something went wrong");

    }
  }

)

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city, { rejectWithValue }) => {
    try {

      const data = await getWeatherForecast(city)
      if (data.cod === "404") {
        return rejectWithValue("City not found");
      }

      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }

      return rejectWithValue("Something went wrong");

    }

  }
)

const initialState = {
  name: null,
  main: {},
  wind: {},
  sys: {},
  weather: [],
  clouds: {},
  loadingWeather: false,
  loadingForecast: false,
  error: null,
  forecastCity: null,
  forecastList: [],


};


const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.name = null;
      state.main = {};
      state.wind = {};
      state.sys = {};
      state.weather = [];
      state.clouds = {};
      state.error = null;

      state.forecastCity = null;
      state.forecastList = [];

    },


  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loadingWeather = true
        state.error = null
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loadingWeather = false;
        state.error = null;
        state.name = action.payload.name;
        state.main = action.payload.main ?? {};
        state.wind = action.payload.wind ?? {};
        state.sys = action.payload.sys ?? {};
        state.weather = action.payload.weather ?? [];
        state.clouds = action.payload.clouds ?? {};

      })

      .addCase(fetchWeather.rejected, (state, action) => {
        state.loadingWeather = false
        state.error = action.payload;

      })



      //forcast
      .addCase(fetchForecast.pending, (state) => {
        state.loadingForecast = true
        state.error = null
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loadingForecast = false;
        state.error = null;
        state.forecastCity = action.payload.city
        state.forecastList = action.payload.list

      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loadingForecast = false
        state.error = action.payload;
      })
  }

})


export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer;



