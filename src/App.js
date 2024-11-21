import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RoleList from "./components/RoleManagement/RoleList";
import AddEditRole from "./components/RoleManagement/AddEditRole";
import UserList from "./components/UserManagement/UserList";
import AddEditUser from "./components/UserManagement/AddEditUser";

import NotFound from "./components/NotFound";
import './index.css';
import { fetchRoles } from "./api";

const App = () => {

  const [roles,setRoles] = useState([]);

  useEffect(()=>{
    const getRoles = async()=>{
      const resp = await fetchRoles();
      if(resp){
        console.log(resp.data, "resp.dataa");
        setRoles(resp.data);
      }
    }
    getRoles();
  },[])
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar (Persistent across pages) */}
        <Navbar />

        <div className="flex">
          {/* Sidebar (Persistent across pages) */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<UserList roles={roles} />} />
              <Route path="/add-user" element={<AddEditUser roles={roles} />} />
              <Route
                path="/edit-user/:id"
                element={<AddEditUser editUser={true} roles={roles} />}
              />
              <Route
                path="/roles"
                element={<RoleList roles={roles} setRoles={setRoles} />}
              />
              <Route
                path="/add-role"
                element={<AddEditRole roles={roles} setRoles={setRoles} />}
              />
              <Route
                path="/edit-role/:id"
                element={<AddEditRole roles={roles} setRoles={setRoles} />}
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
