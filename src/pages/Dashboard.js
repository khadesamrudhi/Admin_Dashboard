import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);  // State for storing user count
  const [roleCount, setRoleCount] = useState(0);  // State for storing role count

  // Fetch user and role counts when the dashboard loads
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total users count
        const userResponse = await axios.get(`${API_BASE}/users`);
        setUserCount(userResponse.data.length);

        // Fetch total roles count
        const roleResponse = await axios.get(`${API_BASE}/roles`);
        setRoleCount(roleResponse.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);  // Empty dependency array means this effect runs once after initial render

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Dashboard stats */}
      <div className="dashboard-stats">
        <div className="stat">
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>
        <div className="stat">
          <h2>Total Roles</h2>
          <p>{roleCount}</p>
        </div>
      </div>

      {/* Navigation to manage users, roles, permissions */}
      <div className="dashboard-links">
        <Link to="/users" className="dashboard-link">
          Manage Users
        </Link>
        <Link to="/roles" className="dashboard-link">
          Manage Roles
        </Link>
        <Link to="/permissions" className="dashboard-link">
          Manage Permissions
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
