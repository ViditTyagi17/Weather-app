
import { useSelector } from "react-redux";
import Loader from "./Loader";


function ForecastCard() {
  const { forecastList, loadingForecast,  } = useSelector(
    (state) => state.weather
  );

  if (loadingForecast) return <Loader />;
 
  if (!forecastList || forecastList.length === 0) return null;

  const today=new Date().toISOString().split("T")[0]

  const dailyData = forecastList.filter((item) =>
    item.dt_txt.includes("12:00:00")&&
    !item.dt_txt.startsWith(today)
  );

  return (
    <div className="m-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-4 ">
      {dailyData.map((item) => (
        <div
          key={item.dt}
          className="dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900 p-4 rounded-xl 
          shadow-xl place-items-center border-black "
        >
          <h3 className="text-lg sm:text-xl font-bold">{item.dt_txt.split(" ")[0]}</h3>

          <p className="text-sm sm:text-lg ">Temperature: {item.main.temp}°C</p>

          <p className="text-sm sm:text-lg ">Wind Speed: {item.wind?.speed} m/s</p>
          <p className="text-sm sm:text-lg ">Humidity: {item.main?.humidity}%</p>
          <p className="text-sm sm:text-lg ">Clouds: {item.clouds?.all}%</p>

          <p className="text-sm sm:text-lg ">Condition: {item.weather[0].main}</p>
          <p className="text-sm sm:text-lg ">Description: {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastCard;
