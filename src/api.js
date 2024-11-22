import axios from "axios";

const API_BASE = "https://673f4eb6a9bc276ec4b815f5.mockapi.io/api/";

const api = axios.create({
  baseURL: API_BASE,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 5000,
});

const handleError = (error) => {
  if (error.response) {
    console.error(`API Error: ${error.response.status}`, error.response.data);
    return error.response.data.message || "An error occurred while processing the request.";
  } else if (error.request) {
    console.error("API Error: No response received", error.request);
    return "No response from server. Please try again later.";
  } else {
    console.error("API Error:", error.message);
    return "An unexpected error occurred.";
  }
};

// User API Calls
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    if (!response || !response.data) throw new Error("Invalid response format");
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    if (!response || !response.data) throw new Error("Invalid response format");
    return response;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const addUser = async (user) => {
  try {
    const response = await api.post(`roles/${user.roleId}/users`, user);
    return response;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const deleteUser = async (user) => {
  try {
    await api.delete(`roles/${user.roleId}/users/${user.id}`);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Role API Calls
export const fetchRoles = async () => {
  try {
    const response = await api.get("/roles");
    if (!response || !response.data) throw new Error("Invalid response format");
    return response;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const addRole = async (role) => {
  try {
    const response = await api.post("/roles", role);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const updateRole = async (id, role) => {
  try {
    const response = await api.put(`/roles/${id}`, role);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const deleteRole = async (id) => {
  try {
    await api.delete(`/roles/${id}`);
  } catch (error) {
    throw new Error(handleError(error));
  }
};
