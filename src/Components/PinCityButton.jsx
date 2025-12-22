import { useCallback } from "react";
import Button from "./Button";
import { createPinnedCity } from "../features/weather/pinnedCitiesSlice";
import { useDispatch } from "react-redux";

function PinCityButton({ city, userId }) {
  const dispatch = useDispatch();
  const handlePinCity = useCallback(async () => {
    if (!city.trim()) return;
    dispatch(createPinnedCity(city.trim()))
      .unwrap()
      .then(() => {
        window.alert(`${city} is pinned`);
      });
  }, [dispatch, city]);
  return (
    <Button
      onClick={handlePinCity}
      disabled={!city.trim() || !userId}
      className="cursor-pointer rounded-xl hover:bg-blue-700  transition-colors 
        disabled:bg-blue-500 disabled:cursor-not-allowed "
    >
      Pin
    </Button>
  );
}

export default PinCityButton;
