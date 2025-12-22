import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import Button from "./Button";
import { themeToggler } from "../features/mode/themeSlice";
import useTheme from "../features/mode/useTheme";

function Header() {
  const dispatch = useDispatch();

  const authstatus = useSelector((state) => state.auth.status);
  const theme = useTheme();
  return (
    <>
      <header className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow  p-4 sm:p-8">
        <div
          className="flex flex-col sm:flex-row sm:gap-6 gap-3 sm:items-center sm:justify-between   
      "
        >
          <h1 className="     text-xl sm:text-2xl font-bold">Weather App</h1>

          <nav className="flex flex-wrap gap-3 sm:gap-6 items-center justify-evenly         sm:justify-end sm:text-lg text-md ">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "    dark:text-blue-300 text-blue-500 "
                  : "text-gray-900 dark:text-white dark:hover:text-blue-300 hover:text-blue-500";
              }}
              to={"/"}
            >
              Home
            </NavLink>

            {!authstatus && (
              <>
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "    dark:text-blue-300 text-blue-500 "
                      : "text-gray-900 dark:text-white dark:hover:text-blue-300 hover:text-blue-500";
                  }}
                  to={"/login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive
                      ? "    dark:text-blue-300 text-blue-500 "
                      : "text-gray-900 dark:text-white dark:hover:text-blue-300 hover:text-blue-500";
                  }}
                  to={"/signup"}
                >
                  Signup
                </NavLink>
              </>
            )}

            <Button
              textcolor="text-gray-900"
              className=" bg-inherit  dark:text-white text-gray-900 transition-colors duration-500 ease-in-out  rounded-3xl cursor-pointer"
              onClick={() => dispatch(themeToggler())}
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </Button>

            {authstatus && <LogoutButton />}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
