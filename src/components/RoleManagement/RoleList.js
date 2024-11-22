import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // For the search icon

const RoleList = ({ roles, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter roles based on search term
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (roleId) => {
    window.location.href = '/edit-role/' + roleId;
  };

  const handleDelete = (roleId) => {
    onDelete(roleId);  // Call the onDelete function passed as a prop
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Role Management</h2>

      {/* Search bar with icon */}
      <div className="flex items-center mb-6">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by role name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table with enhanced styles */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">Role Name</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{role.name}</td>
              <td className="px-6 py-4 text-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleEdit(role.id)}
                >
                  Edit
                </button>
                <button
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(role.id)} // Delete the role when clicked
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
