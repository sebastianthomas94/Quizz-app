import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRankMutation, useLogoutMutation } from "../slices/apiSlice.js";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState();
  const [getRank] = useGetRankMutation();
  const [logout] = useLogoutMutation();

  const fetchRank = async () => {
    try {
      const { rank } = await getRank().unwrap();
      setRank(rank);
    } catch (error) {
      toast.dark(error?.data?.message);
    }
  };

  useEffect(() => {
    fetchRank();
  }, []);

  const handleLogout = async () => {
    document.cookie =
      "jwt" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
    await logout().unwrap();
  };
  return (
    <nav className="bg-gradient-to-r from-black to-blue-500 p-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <span className="text-white text-2xl font-bold">Quiz App</span>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center space-x-4">
        {/* Rank */}
        <div className="text-white">
          Rank: <span className="font-bold">{rank}</span>
        </div>

        {/* Leaderboard button */}
        <button
          className="bg-white text-blue-500 py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          Leaderboard
        </button>

        {/* Logout button */}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
