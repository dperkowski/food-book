import axios from "axios";

const API_URL = "/api/recipe/";

// Register recipe
const register = async (recipeData) => {
  const response = await axios.post(API_URL + "getall", recipeData);

  if (response.data) {
    localStorage.setItem("recipe", JSON.stringify(response.data));
  }

  return response.data;
};

// loadRecipe
const loadRecipe = async () => {
  const response = await axios.get(API_URL + "getall");
  if (response.data) {
    localStorage.setItem("recipe", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const deleterecipe = () => {
  localStorage.removeItem("recipe");
};

const recipe = {
  register,
  loadRecipe,
  deleterecipe,
};

export default recipe;
