

import { useSelector, useDispatch } from "react-redux";
import PinnedCityCard from "../Components/PinnedCityCard";
import { deleteCity } from "../features/weather/pinnedCitiesSlice";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function PinnedCitiesList() {
   const dispatch = useDispatch();
   const {  loading,error } = useSelector(state => state.pinnedCitiesList);
   
   
  const pinnedCities = useSelector((state) => state.pinnedCitiesList.pinnedCities);
  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };

  if (loading) {
     return <Loader />;
   }
 
 
  return (
    <div>
      {error && <ErrorMessage error={error} />}
       {pinnedCities.map((city) => (
        <PinnedCityCard
          key={city.$id}
          pinnedCity={city}
          onDelete={handleDelete}
        />
      ))}
      
    </div>
  )
}

export default PinnedCitiesList
