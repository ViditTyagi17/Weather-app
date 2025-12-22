import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPinnedCityForecast,
  getPinnedCityWeather,
} from "../features/weather/pinnedWeatherSlice";
import Loader from "./Loader";
import Button from "./Button";
import PinnedForecastCard from "./PinnedForecastCard";
import ErrorMessage from "./ErrorMessage";

function PinnedCityCard({ pinnedCity, onDelete }) {
  const dispatch = useDispatch();

  const {pinnedCitiesData,error }= useSelector(
    (state) => state.pinnedCitiesWeather
  );
  const cityKey = pinnedCity.city.toLowerCase();
  const data = pinnedCitiesData[cityKey];

  useEffect(() => {
    dispatch(getPinnedCityWeather(pinnedCity.city));
  }, [pinnedCity.city]);

  const handlePinnedWeather = () => {
    dispatch(getPinnedCityForecast(pinnedCity.city));
  };

  if (!data) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
    
      <div className="flex gap-4  items-center justify-center  text-2xl mt-6 pt-6 ">
        <h2 className="text-gray-900 font-bold dark:text-white  ">
          {pinnedCity.city}
        </h2>
        <button
          onClick={() => onDelete(pinnedCity.$id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center justify-center mx-4 my-6 ">
        <div className="text-gray-900  dark:text-gray-100  bg-white dark:bg-gray-900 border-black max-w-3xl min-w-auto w-full  shadow-xl rounded-3xl p-6 ">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-3xl font-bold">
              <h2>
                {data?.name} ({data?.sys?.country})
              </h2>
              <p>{data.weather?.[0]?.description}</p>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
              alt={data.weather?.[0]?.description}
            />
          </div>

          <div className="flex flex-col justify-center items-center  font-bold ">
            <p className="  text-3xl sm:text-5xl font-extrabold mb-2">
              Temperature: {data.main?.temp}°C
            </p>
            <p className=" text-2xl  sm:text-4xl ">Feels Like: {data.main?.feels_like}°C</p>
          </div>

          <div className="grid grid-cols-2 place-items-center mt-6 text-sm sm:text-xl font-bold gap-4">
            <div>
              <p>Min Temp: {data.main?.temp_min}°C</p>
              <p>Humidity: {data.main?.humidity}%</p>
              <p>Wind Speed: {data.wind?.speed} m/s</p>
              <p>Clouds: {data.clouds?.all}%</p>
            </div>
            <div>
              <p>Max Temp: {data.main?.temp_max}°C</p>
              <p>Pressure: {data.main?.pressure} hPa</p>
              <p>Wind Direction: {data.wind?.deg}°</p>
              <p>Condition: {data.weather?.[0]?.main}</p>
            </div>
          </div>

          <div className="sm:text-xl text-sm  flex items-center justify-between font-bold mt-6">
            <p>
              🌅 Sunrise:{" "}
              {new Date(data.sys?.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              🌇 Sunset:{" "}
              {new Date(data.sys?.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Button
              className="sm:text-lg text-md font-bold  w-full mt-6 cursor-pointer hover:bg-blue-700"
              onClick={handlePinnedWeather}
            >
               Forecast
            </Button>
          </div>
        </div>
      </div>
      {data.forecast && <PinnedForecastCard city={cityKey} />}
    </>
  );
}

export default PinnedCityCard;
