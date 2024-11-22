// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUsers, FaPlus, FaTasks } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 text-white p-6 shadow-2xl flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-extrabold mb-10 text-center uppercase tracking-wider">
          Admin Panel
        </h2>
        <nav className="space-y-12">
          {/* User and Role Management Section */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center py-3 px-4 text-lg font-semibold hover:bg-blue-700 rounded-lg transition-all group"
            >
              <FaUser className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span>User Management</span>
            </Link>
            <Link
              to="/roles"
              className="flex items-center py-3 px-4 text-lg font-semibold hover:bg-blue-700 rounded-lg transition-all group"
            >
              <FaTasks className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span>Role Management</span>
            </Link>
          </div>

          {/* Add User and Add Role Section */}
          <div className="space-y-6">
            <Link
              to="/add-user"
              className="flex items-center py-3 px-4 text-lg font-bold bg-blue-700 hover:bg-blue-800 rounded-lg transition-all group"
            >
              <FaPlus className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span>Add User</span>
            </Link>
            <Link
              to="/add-role"
              className="flex items-center py-3 px-4 text-lg font-bold bg-blue-700 hover:bg-blue-800 rounded-lg transition-all group"
            >
              <FaUsers className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span>Add Role</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-300">&copy; 2024 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;
