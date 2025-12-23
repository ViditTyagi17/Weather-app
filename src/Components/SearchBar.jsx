import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather, clearWeather } from "../features/weather/weatherSlice";
import SearchHistory from "./SearchHistory";
import { useNavigate } from "react-router-dom";
import PinCityButton from "./PinCityButton";

function SearchBar({ showPin = false }) {
  const { name, error } = useSelector((state) => state.weather);

  const userId = useSelector((state) => state.auth.userData?.$id);

  const userStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [isFocused, setisFocused] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weather.loadingWeather);
  const history = useSelector((state) => state.history.cities);
  // inside SearchBar
  const pinnedCities = useSelector(
    (state) => state.pinnedCitiesList.pinnedCities || []
  );

  // check if current weather city is already pinned
  const currentCityIsPinned = pinnedCities.some(
    (row) => row.city?.toLowerCase().trim() === name?.toLowerCase().trim()
  );

  const handleSearch = useCallback(() => {
    if (!city.trim()) return;
    dispatch(clearWeather());
    dispatch(fetchWeather(city));

    if (userStatus) {
      navigate(`/search/${city}`);
    }

    setisFocused(false);
  }, [navigate, userStatus, city, dispatch]);

  const handleSelectHistory = useCallback(
    (item) => {
      dispatch(clearWeather());
      dispatch(fetchWeather(item));

      if (userStatus) {
        navigate(`/search/${item}`);
      }
      setisFocused(false);
    },
    [dispatch, navigate, userStatus]
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto  my-6">
        <div className=" relative  flex justify-center items-center  gap-2 mx-4 ">
          <Input
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // same function you use for the Search button
              }
            }}
            type="search"
            value={city}
            placeholder={"Enter the city"}
            onFocus={() => setisFocused(true)}
            onBlur={() => setisFocused(false)}
            className="flex-1 rounded-xl border-2 shadow-md hover:shadow-lg transition-shadow duration-300 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 "
          ></Input>
          <Button
            onMouseDown={handleSearch}
            disabled={!city.trim() || loading}
            loading={loading}
            className="cursor-pointer rounded-xl hover:bg-blue-700  transition-colors 
        disabled:bg-blue-500 disabled:cursor-not-allowed "
          >
            Search
          </Button>

          {showPin && userStatus && name && !error && !currentCityIsPinned && (
            <PinCityButton city={name} userId={userId} />
          )}

          <div className="absolute top-full left-0 w-full  z-10">
            {isFocused && history.length > 0 && (
              <div>
                {" "}
                <SearchHistory
                  history={history}
                  onSelect={handleSelectHistory}
                />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
