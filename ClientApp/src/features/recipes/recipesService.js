import axios from "axios";

const API_URL = "/api/recipes/";

// Register recipes
const register = async (recipesData) => {
  const response = await axios.post(API_URL + "recipes", recipesData);

  if (response.data) {
    localStorage.setItem("recipes", JSON.stringify(response.data));
  }

  return response.data;
};

// loadRecipe
const loadRecipe = async (recipesData) => {
  const response = await axios.post(API_URL + "recipes", recipesData);

  if (response.data) {
    localStorage.setItem("recipes", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const deleteRecipes = () => {
  localStorage.removeItem("recipes");
};

const recipes = {
  register,
  loadRecipe,
  deleteRecipes,
};

export default recipes;
