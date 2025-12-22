import WeatherCard from "../Components/WeatherCard";
import SearchBar from "../Components/SearchBar";

import ForecastCard from "../Components/ForecastCard";
import PinnedCitiesList from "../Components/PinnedCitiesList";

import { useSelector } from "react-redux";



function Home() {
 const userStatus = useSelector((state) => state.auth.status);
  const pinnedCities = useSelector((state) => state.pinnedCitiesList.pinnedCities);



  return (
    <div>
      <SearchBar showPin={false} />

      {!userStatus&&  (
        <>
        <WeatherCard />
      <ForecastCard />
        </>
      )}
      
      { userStatus &&  pinnedCities.length > 0 && <PinnedCitiesList />}
     
    </div>
  );
}

export default Home;
