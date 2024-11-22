import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);  
  const [roleCount, setRoleCount] = useState(0);  

  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        
        const userResponse = await axios.get(`${API_BASE}/users`);
        setUserCount(userResponse.data.length);

        
        const roleResponse = await axios.get(`${API_BASE}/roles`);
        setRoleCount(roleResponse.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []); 

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      
      
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
