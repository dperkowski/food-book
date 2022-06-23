import axios from "axios";

const API_URL = "/api/recipe/";

// Add Recipe

const addRecipe = async (recipeData) => {
  const config = {
    headers: { Authorization: `Bearer ${recipeData.token}` },
  };

  const response = await axios
    .post(API_URL + "add", recipeData, config)
    .then(console.log)
    .catch(console.log);

  if (response.data) {
    localStorage.setItem("recipe", JSON.stringify(response.data));
  }

  return response.data;
};

// Load recipe
const loadRecipe = async () => {
  const response = await axios.get(API_URL + "getall");
  if (response.data) {
    localStorage.setItem("recipe", JSON.stringify(response.data));
  }

  return response.data;
};

// Delete recipe
const deleteRecipe = () => {
  localStorage.removeItem("recipe");
};

const recipe = {
  addRecipe,
  loadRecipe,
  deleteRecipe,
};

export default recipe;
