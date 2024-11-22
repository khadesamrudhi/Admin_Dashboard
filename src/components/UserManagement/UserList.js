import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import { FaSearch } from 'react-icons/fa'; 
const UserList = ({ roles }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const rolesMap = new Map(roles.map(role => [role.id, role.name]));

  useEffect(() => {
    
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };
    getUsers();
  }, []);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

 
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditing = (userId) => {
    window.location.href = `/edit-user/${userId}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Management</h2>

      
      <div className="flex items-center mb-6">
        <FaSearch className="text-gray-500 mr-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">Name</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">Email</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b">Role</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 border-b">Status</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{rolesMap.get(user.roleId)}</td>
              <td className="px-6 py-4 text-sm text-center">
                <span
                  className={`${
                    user.status ? 'text-green-600' : 'text-red-600'
                  } font-semibold`}
                >
                  {user.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleEditing(user.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
