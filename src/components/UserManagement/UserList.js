import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';

const UserList = ({roles}) => {
  // const users = [
  //   { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin', status: 'Active' },
  //   { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User', status: 'Inactive' },
  // ];
  const [users, setUsers] = useState([]);
  const rolesMap = new Map(roles.map(role => [role.id, role.name]));
  useEffect(() => {
    // Fetch user data from the API
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };
    getUsers();

  }, []);

  // const editUser = () => {
  //   // Handle edit user action
  //   const userEditing = async () => {
  //     const usersList = await fetchUsers();
  //     setUsers(usersList);
  //   };
  // };
  const handleEditing = (userId) => {
    window.location.href = `/edit-user/${userId}`
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Role</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{rolesMap.get(user.roleId)}</td>
              <td className="px-4 py-2">{user.status?"Active":"InActive"}</td>
              <td className="px-4 py-2 text-center">
                <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditing(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
