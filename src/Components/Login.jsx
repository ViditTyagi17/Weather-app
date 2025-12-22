import  { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/auth/authSlice";
import {clearWeather} from "../features/weather/weatherSlice"
import { fetchPinnedCities } from "../features/weather/pinnedCitiesSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const session = await authService.login(data.email, data.password);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          dispatch(fetchPinnedCities());
        }
        dispatch(clearWeather());
        navigate("/");
      }
    } catch (error) {
      console.error("Error can not login", error);
      setErrorMsg(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-300 dark:bg-gray-800  p-4 sm:p-6 ">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg  p-6 sm:p-8  shadow-lg">
        <h1 className="text-3xl font-bold m-6 text-center">Login</h1>
    <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
      <div className=" space-y-2 ">
      <Input
      className=" rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
        disabled={loading}
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}

      <Input
      className=" rounded-md border-2 border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
        disabled={loading}
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold" disabled={loading} type="submit">
        {loading ? "Logging in..." : "Login"}
      </Button>
      </div>
    </form>
    <p className="text-center text-sm mt-4 text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
    
      </div>
    </div>
    
  );
}

export default Login;
