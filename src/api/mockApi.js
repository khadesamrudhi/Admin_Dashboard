import axios from "axios";

const addUser = async () => {
  const newUser = {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "Active"
  };

  try {
    const response = await axios.post("http://localhost:5000/users", newUser);
    console.log("User added:", response.data);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

addUser();
