import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import service from "../../appwrite/pinnedCitiesService"

import { Query } from "appwrite";




export const fetchPinnedCities = createAsyncThunk(

  "pinnedCities/fetchPinnedCities",
  async (_, { getState, rejectWithValue }) => {

    try {


      const userId = getState().auth.userData?.$id
      if (!userId) return [];

      const cities = await service.getCities([Query.equal("userId", userId)])
      if (!cities || !cities.rows) return [];

      return cities?.rows || [];
    } catch (error) {
      return rejectWithValue("Failed to fetch pinned cities");

    }


  });



export const createPinnedCity = createAsyncThunk(
  "pinnedCities/createPinnedCity",
  async (city, { getState, dispatch, rejectWithValue }) => {
    try {

      const userId = getState().auth.userData?.$id;
      if (!userId) return rejectWithValue("User not logged in");

      await service.createCities({ city, userId });
      const fetchCities = await dispatch(fetchPinnedCities()).unwrap()

      return fetchCities;
    } catch (error) {
      return rejectWithValue("Failed to create pinned city");

    }


  }
)



export const deleteCity = createAsyncThunk(
  "pinnedCities/deleteCity",
  async (rowId, { dispatch, rejectWithValue }) => {
    try {

      await service.deleteCity(rowId);
      const fetchCities = await dispatch(fetchPinnedCities()).unwrap()
      return fetchCities;
    } catch (error) {
      return rejectWithValue("Failed to delete pinned city");

    }



  }
)


const initialState = {
  pinnedCities: [],
  loading: false,
  error: null,
}

const pinnedCitiesSlice = createSlice({
  name: "pinnedCitiesList",
  initialState,
  reducers: {
    clearCities: (state) => {
      state.pinnedCities = []
    }
  },
  extraReducers: (builder) => {

    builder

      .addCase(fetchPinnedCities.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchPinnedCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null
        state.pinnedCities = action.payload
      })

      .addCase(fetchPinnedCities.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createPinnedCity.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        if (action.payload) {
          state.pinnedCities = action.payload
        }
      })



      .addCase(createPinnedCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(deleteCity.fulfilled, (state, action) => {
        state.pinnedCities = action.payload
      })

      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })








  }



})

export const { clearCities } = pinnedCitiesSlice.actions
export default pinnedCitiesSlice.reducer








