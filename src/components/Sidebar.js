// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";



const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-8">
      <h2 className="text-2xl font-semibold mb-8 text-center text-white">Admin Panel</h2>
      <nav className="space-y-6">
        {/* User and Role Management Section */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block py-3 px-6 text-lg font-bold  text-white hover:bg-blue-600 transition-all transform hover:scale-105 text-right no-underline"
          >
            User Management
          </Link>
          <Link
            to="/roles"
            className="block py-3 px-6 text-lg font-bold  text-white hover:bg-blue-600 transition-all transform hover:scale-105 text-right no-underline"
          >
            Role Management
          </Link>
          
        </div>
        
        {/* Add User and Add Role Section */}
        <div className="space-y-4 mt-6">
          <Link
            to="/add-user"
            className="block py-3 px-6 text-lg font-bold  text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 text-right no-underline"
          >
            Add User
          </Link>
          <Link
            to="/add-role"
            className="block py-3 px-6 text-lg font-bold  text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 text-right no-underline"
          >
            Add Role
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
