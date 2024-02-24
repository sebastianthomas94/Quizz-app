// src/components/Register.js
import React, { useState } from "react";
import { useSigninMutation, useSignupMutation } from "../slices/apiSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ name: "", password: "", email: "" });
  const [register] = useSignupMutation();
  const [signin] = useSigninMutation();
  const navigate = useNavigate();

  const dataHandle = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!data.name.trim() || !data.password.trim() || !data.email.trim())
      return toast.info("Enter all the values 🕵");
    try {
      const response = await register({ data }).unwrap();
      toast.success(response.message + " 🔥");
      const { email, password } = data;
      const token = await signin({ email, password }).unwrap();
      console.log(token);
      toast.done(token.message);
      navigate("/home");
    } catch (error) {
      if (error.data) {
        toast.error(error.data.message + " 🤥");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="m-auto p-6 bg-white rounded-md shadow-md max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={dataHandle}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={dataHandle}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
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
            type="submit"
          >
            Register
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-10 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={()=>navigate('/login')}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
