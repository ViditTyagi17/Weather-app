import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: JSON.parse(localStorage.getItem("recentCities")) || []
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {

    addCity: (state, action) => {
      const newCity = action.payload;
      state.cities = state.cities.filter(city => city.toLowerCase()
        !== newCity.toLowerCase()
      )
      state.cities.unshift(newCity)
      if (state.cities.length > 4) {
        state.cities.pop()
      }
      localStorage.setItem("recentCities", JSON.stringify(state.cities));
    }

  }

})
export const { addCity } = historySlice.actions
export default historySlice.reducer;