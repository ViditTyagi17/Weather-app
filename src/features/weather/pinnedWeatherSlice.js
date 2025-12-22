import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getWeatherForecast } from './weatherAPI'
import { addCity } from "../History/historySlice";


export const getPinnedCityWeather = createAsyncThunk(
  "weather/fetchPinnedWeather",
  async (city, { dispatch, rejectWithValue }) => {
    try {

      const data = await getCurrentWeather(city)
      if (data.cod === "404") {
        return rejectWithValue("City not found");
      }


      dispatch(addCity(city))
      return { city: city.toLowerCase(), data };

    } catch (error) {

      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }
      return rejectWithValue("Something went wrong");
    }
  }

)

export const getPinnedCityForecast = createAsyncThunk(
  "weather/fetchPinnedForecast",
  async (city,{rejectWithValue}) => {
    try {
      
      const data = await getWeatherForecast(city)
      if (data.cod === "404") {
        return rejectWithValue("City not found");
      }
      return { city: city.toLowerCase(), data };
    } catch (error) {
      
      if (error.response && error.response.status === 404) {
        return rejectWithValue("City not found");
      }
      return rejectWithValue("Something went wrong");
      
    }
  }

)

const initialState = {

  error: null,
  pinnedCitiesData: {}


};


const pinnedCitiesWeatherSlice = createSlice({
  name: "pinnedCitiesWeather",
  initialState,
  reducers: {
    clearWeather: (state) => {

      state.error = null;
      state.pinnedCitiesData = {}


    },


  },

  extraReducers: (builder) => {
    builder
      .addCase(getPinnedCityWeather.pending, (state) => {

        state.error = null
      })

      .addCase(getPinnedCityWeather.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { city, data } = action.payload

        state.error = null;
        state.pinnedCitiesData[city] = data;


      })

      .addCase(getPinnedCityWeather.rejected, (state, action) => {

        state.error = action.payload;
      })



      //forcast
      .addCase(getPinnedCityForecast.pending, (state) => {

        state.error = null
      })
      .addCase(getPinnedCityForecast.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { city, data } = action.payload

        state.error = null;
        if (!state.pinnedCitiesData[city]) {
          state.pinnedCitiesData[city] = {};
        }
        state.pinnedCitiesData[city].forecast = data



      })
      .addCase(getPinnedCityForecast.rejected, (state, action) => {

        state.error = action.payload;
      })
  }

})


export const { clearWeather } = pinnedCitiesWeatherSlice.actions
export default pinnedCitiesWeatherSlice.reducer;



