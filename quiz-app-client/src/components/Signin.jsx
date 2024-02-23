// src/components/Login.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSigninMutation } from "../slices/apiSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [signin] = useSigninMutation();
  const navigate = useNavigate();

  const handleClick = async() => {
    if (!data.password.trim() || !data.email.trim())
      return toast.info("Enter all the values 🕵");
    try {
      const response = await signin(data).unwrap();
      if(response.token)
      {
        toast.success(response.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const dataHandle = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="m-auto p-6 bg-white rounded-md shadow-md max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={dataHandle}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={dataHandle}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleClick}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
