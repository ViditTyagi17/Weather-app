import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import { fetchForecast } from "../features/weather/weatherSlice";

function WeatherCard() {
  const dispatch = useDispatch();
  const { name, main, weather, wind, sys, clouds, loadingWeather, error } =
    useSelector((state) => state.weather);
  if (loadingWeather) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!name) return null;
  const handleForecast = () => {
    dispatch(fetchForecast(name));
  };
  return (
    
    
    <div className=" flex items-center justify-center  my-6 mx-4 ">
      <div className="text-gray-900  dark:text-gray-100  bg-white dark:bg-gray-900 border-black max-w-3xl min-w-auto w-full  shadow-xl rounded-3xl p-6 ">
        <div className="flex justify-between items-center">
          <div className="text-xl sm:text-3xl font-bold  ">
            <h2>
              {name} ({sys?.country})
            </h2>
            <p> {weather?.[0]?.description}</p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.[0]?.icon}@2x.png`}
            alt={weather?.[0]?.description}
          />
        </div>

        <div className="flex flex-col justify-center items-center  font-bold ">
          <p className="text-3xl sm:text-5xl font-extrabold mb-2">Temperature: {main?.temp}°C</p>
          <p className="text-2xl  sm:text-4xl ">Feels Like: {main?.feels_like}°C</p>
        </div>

        <div className="grid grid-cols-2 place-items-center mt-6 text-sm sm:text-xl font-bold gap-4">
          <div>
            <p>Min Temp: {main?.temp_min}°C</p>

            <p>Humidity: {main?.humidity}%</p>
            <p>Wind Speed: {wind?.speed} m/s</p>

            <p>Clouds: {clouds?.all}%</p>
          </div>
          <div>
            <p>Max Temp: {main?.temp_max}°C</p>
            <p>Pressure: {main?.pressure} hPa</p>
            <p>Wind Direction: {wind?.deg}°</p>
            <p>Condition: {weather?.[0]?.main}</p>
          </div>
        </div>

        <div className="sm:text-xl text-sm flex items-center justify-between font-bold mt-6">
          <p>
            🌅 Sunrise: {new Date(sys?.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>🌇 Sunset: {new Date(sys?.sunset * 1000).toLocaleTimeString()}</p>
        </div>

        <div className="flex justify-center items-center  ">
          <Button
            className="sm:text-lg text-md font-bold w-full mt-6 cursor-pointer hover:bg-blue-700"
            onClick={handleForecast}
          >
             Forecast
          </Button>
        </div>
      </div>
    </div>
    
  );
}

export default WeatherCard;
