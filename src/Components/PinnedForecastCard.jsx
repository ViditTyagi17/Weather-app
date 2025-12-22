import React from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

function PinnedForecastCard({ city }) {
  
  const cityForecast = useSelector(
    (state) => state.pinnedCitiesWeather.pinnedCitiesData
  );
 const today=new Date().toISOString().split("T")[0]
  const forecastList = cityForecast?.[city]?.forecast?.list ?? [];
    const forecastData = forecastList.filter((item) =>
    item.dt_txt.includes("12:00:00") &&
    !item.dt_txt.startsWith(today)
  );




  if (forecastData.length===0) {
    return <p className="text-center mt-4">No forecast data available.</p>;
  }


  return (
    <div className="m-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-4 ">
      {forecastData.map((item) => (
        <div
          key={item.dt}
          className="dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900 p-4 rounded-xl 
          shadow-xl place-items-center border-black "
        >
          <h3 className="text-lg sm:text-xl font-bold">{item.dt_txt.split(" ")[0]}</h3>

          <p  className="text-sm sm:text-lg">Temperature: {item.main?.temp}°C</p>

          <p className="text-sm sm:text-lg">Wind Speed: {item.wind?.speed} m/s</p>
          <p className="text-sm sm:text-lg">Humidity: {item.main?.humidity}%</p>
          <p className="text-sm sm:text-lg">Clouds: {item.clouds?.all}%</p>

          <p className="text-sm sm:text-lg">Condition: {item.weather?.[0]?.main}</p>
          <p className="text-sm sm:text-lg">Description: {item.weather?.[0]?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PinnedForecastCard;
