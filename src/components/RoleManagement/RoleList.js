import React from 'react';

const RoleList = ({roles}) => {
  // const roles = [
  //   { id: 1, name: 'Admin', permissions: ['Add User', 'Edit User', 'Delete User'] },
  //   { id: 2, name: 'Editor', permissions: ['Edit User', 'View User'] },
  //   { id: 3, name: 'Viewer', permissions: ['View User'] },
  // ];

  const handleEdit = (rolId)=>{
    window.location.href = '/edit-role/'+rolId;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Role Management</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Role Name</th>
            <th className="px-4 py-2 border-b text-left">Permissions</th>
            <th className="px-4 py-2 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2">{role.permissions.join(", ")}</td>
              <td className="px-4 py-2 text-center">
                <button className="text-blue-600 hover:text-blue-800" onClick={()=> handleEdit(role.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
