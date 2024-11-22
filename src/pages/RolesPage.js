import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE}/roles`);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleUpdate = (updatedRole) => {
    setRoles((prevRoles) => {
      return prevRoles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role
      );
    });
  };

  return (
    <div>
      <h1>Role Management</h1>
      <Link to="/add-role">
        <button>Add New Role</button>
      </Link>
      <h2>Roles List</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td> {/* Display permissions */}
              <td>
                <Link to={`/edit-role/${role.id}`}>
                  <button>Edit Role</button> {/* Edit Role Link */}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPage;
