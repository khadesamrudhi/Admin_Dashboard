import React, { useState, useEffect } from "react";
import { addRole, updateRole, fetchRoles } from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const AddEditRole = ({ roles }) => {
  const [form, setForm] = useState({ name: "", permissions: [] });
  const { id } = useParams();

  const allPermissions = ["create", "read", "update", "delete"];

  const rolesMap = new Map(roles.map((role) => [role.id, role]));

  // Fetch role details if editing
  useEffect(() => {
    const getRole = async () => {
      try {
        if (id) {
          const role = rolesMap.get(id);
          if (role) {
            setForm({
              name: role.name,
              permissions: role.permissions || [],
            });
          }
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    getRole();
  }, [roles]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        // Permission added, perform "create" action
        setForm((prev) => ({
          ...prev,
          permissions: [...prev.permissions, value], // Add permission
        }));
      } else {
        // Permission removed, perform "delete" action
        setForm((prev) => ({
          ...prev,
          permissions: prev.permissions.filter((perm) => perm !== value), // Remove permission
        }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing role
        await updateRole(id, form);
        alert("Role updated successfully!");
      } else {
        // Add new role
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Permissions
          </label>
          <div className="grid grid-cols-2 gap-4">
            {allPermissions.map((permission) => (
              <label key={permission} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission}
                  checked={form.permissions.includes(permission)} // Pre-check existing permissions
                  onChange={handleChange}
                  className="mr-2"
                />
                {permission.charAt(0).toUpperCase() + permission.slice(1)}{" "}
              </label>
            ))}
          </div>
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
