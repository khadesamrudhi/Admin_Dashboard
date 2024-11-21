import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchUsers, addUser, deleteUser } from "../api"; // Assuming the API functions are in api.js

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users when the component is mounted
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-page">
      <h1>Manage Users</h1>
      
      {/* Loading state */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <div className="actions">
            <Link to="/users/add" className="btn btn-primary">Add User</Link>
          </div>

          {/* Display users in a table */}
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status ? "Active" : "Inactive"}</td>
                  <td>
                    <Link to={`/users/edit/${user.id}`} className="btn btn-warning">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UsersPage;
