import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout, setLoading } from "./features/auth/authSlice";
import { fetchPinnedCities } from "./features/weather/pinnedCitiesSlice";
import { setTheme } from "./features/mode/themeSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    dispatch(setTheme(mediaQuery.matches ? "dark" : "light"));
    
    const handleChange = (e) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    authService.getCurrentUser().then((user) => {
      if (user) {
        dispatch(login(user));

        dispatch(fetchPinnedCities());
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col  min-h-screen bg-gray-300 dark:bg-gray-800">
      <Header />
      <main className="grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
