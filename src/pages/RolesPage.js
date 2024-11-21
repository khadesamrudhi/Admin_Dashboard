import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE}/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

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
                <Link to={`/edit-permissions/${role.id}`}>
                  <button>Edit Permissions</button> {/* Edit Permissions Link */}
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
