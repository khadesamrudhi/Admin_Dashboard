import React, { useState, useEffect } from "react";
import { addRole, updateRole, fetchRoles } from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const AddEditRole = ({ roles }) => {
  const [form, setForm] = useState({ name: "" });
  const { id } = useParams();

  
  const rolesMap = new Map(roles.map((role) => [role.id, role]));

  
  useEffect(() => {
    const getRole = async () => {
      try {
        if (id) {
          const role = rolesMap.get(id);
          if (role) {
            setForm({ name: role.name });
          }
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    getRole();
  }, [roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        
        await updateRole(id, form);
        alert("Role updated successfully!");
      } else {
        
        await addRole(form);
        alert("Role added successfully!");
      }
      window.location.href = "/roles";
    } catch (error) {
      console.error("Error saving role:", error);
      alert("Failed to save role. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? "Edit Role" : "Add New Role"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Role Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {id ? "Save Changes" : "Add Role"}
        </button>
      </form>
    </div>
  );
};

export default AddEditRole;
