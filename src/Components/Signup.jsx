import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import Input from "./Input";
import Button from "./Button";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-800  p-4 sm:p-6">
      <div className="bg-white text-gray-900 dark:text-white dark:bg-gray-900 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl p-8 shadow-lg">
        <h1 className="text-center m-6 font-bold text-3xl">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
          <div className="space-y-2">
            <Input
            className="rounded-md border-2 hover:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
              disabled={loading}
              type="text"
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}

            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            <Input
            className="rounded-md border-2 hover:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
              disabled={loading}
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            <Input
            className="rounded-md border-2 hover:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2"
              disabled={loading}
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}

            <Button 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            disabled={loading} type="submit">
              {" "}
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </div>
        </form>

         <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
