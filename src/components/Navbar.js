// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 p-6 shadow-xl text-white flex items-center justify-between">
      
      <h1 className="text-3xl font-extrabold tracking-wide uppercase">
        Admin Dashboard
      </h1>

     
      <nav>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          onClick={() => alert("Settings Coming Soon!")}
        >
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
