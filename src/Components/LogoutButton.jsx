import React from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { clearCities } from "../features/weather/pinnedCitiesSlice";
import { clearWeather } from "../features/weather/weatherSlice";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      dispatch(clearCities())
      dispatch(clearWeather())
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button className="hover:bg-blue-700" type="button" onClick={logoutHandler}>
      Logout
    </Button>
  );
}

export default LogoutButton;
