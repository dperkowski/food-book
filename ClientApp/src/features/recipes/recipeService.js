import axios from "axios";
import { useEffect } from "react";

const API_URL = "/api/recipe/";

// Add Recipe
const addRecipe = async (recipeData) => {
  const {
    id,
    name,
    desc,
    hardLevel,
    time,
    image,
    userId,
    userFavorites,
    categories,
  } = recipeData;
  const filteredRecipeData = {
    name,
    desc,
    hardLevel,
    time,
    image,
    userId,
    userFavorites,
    categories,
  };

  const response = {};
  try {
    response = await axios.post(API_URL + "add", filteredRecipeData, {
      headers: {
        Authorization: "Bearer " + recipeData.token,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }

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
