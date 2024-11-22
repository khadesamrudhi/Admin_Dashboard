import React, { useEffect, useState } from "react";
import { addUser, fetchUser, updateUser } from "../../api";

const AddEditUser = ({ roles }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleId: roles[0]?.id || "",
    status: "Active", 
  });

  const userId = window.location.pathname.split("/")[2]; 

  useEffect(() => {
    if (userId) {
      
      const getUser = async () => {
        try {
          const resp = await fetchUser(userId);
          if (resp.status === 200) {
            const userData = resp.data;
            setFormData({
              name: userData.name || "",
              email: userData.email || "",
              roleId: userData.roleId || roles[0]?.id || "",
              status: userData.status ? "Active" : "Inactive", 
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      getUser();
    }
  }, [userId, roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      roleId: formData.roleId,
      status: formData.status === "Active", 
    };

    try {
      if (userId) {
        
        const resp = await updateUser(userId, payload);
        if (resp.status === 200) {
          alert("User updated successfully");
          window.location.href = "/users"; 
        }
      } else {
        
        const resp = await addUser(payload);
        if (resp.status === 201) {
          alert("User added successfully");
          window.location.href = "/"; 
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {userId ? "Edit User" : "Add New User"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {userId ? "Save Changes" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddEditUser;
