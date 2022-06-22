import axios from "axios";

const API_URL = "/api/user/";

// Register user
const register = async (userData) => {
  console.log("auth service test");
  console.log(userData);
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
