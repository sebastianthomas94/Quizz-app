import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-black to-blue-500 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-white text-2xl font-bold">Quiz App</span>
      </div>

      {/* Right side navigation */}
      <div className="flex items-center space-x-4">
        {/* Rank */}
        <div className="text-white">Rank: <span className="font-bold">123</span></div>

        {/* Leaderboard button */}
        <button className="bg-white text-blue-500 py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Leaderboard</button>

        {/* Logout button */}
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
