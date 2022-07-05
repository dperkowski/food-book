import axios from "axios";

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
    token,
  } = recipeData;

  let response;
  try {
    response = await axios.post(
      API_URL + "add",
      { name, desc, hardLevel, time, image, userId, userFavorites, categories },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (response.data) {
    localStorage.setItem(
      "userRecipe",
      JSON.stringify(response.data.userRecipes.value)
    );
  }

  return response.data;
};

// Edit Recipe
const editRecipe = async (recipeData) => {
  console.log(recipeData);
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
    token,
  } = recipeData;

  let response;
  try {
    response = await axios.put(
      API_URL + "edit",
      {
        id,
        name,
        desc,
        hardLevel,
        time,
        image,
        userId,
        userFavorites,
        categories,
        token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (response.data) {
    localStorage.setItem(
      "userRecipe",
      JSON.stringify(response.data.userRecipes.value)
    );
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

// Load category
const loadCategory = async () => {
  const response = await axios.get("category/getAll");

  if (response.data) {
    localStorage.setItem("category", JSON.stringify(response.data));
  }

  return response.data;
};

// Load user recipe
const loadUserRecipe = async (userId) => {
  const response = await axios.get(API_URL + "getUserAll/" + userId);
  if (response.data) {
    localStorage.setItem("userRecipe", JSON.stringify(response.data));
  }

  return response.data;
};

// Delete recipe
const deleteRecipe = async (recipeData) => {
  const { userId, id, token } = recipeData;
  const filteredRecipeData = {
    userId,
    id,
  };

  try {
    await axios.delete(API_URL + "remove", {
      data: { ...filteredRecipeData },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const recipe = {
  addRecipe,
  editRecipe,
  loadRecipe,
  loadCategory,
  loadUserRecipe,
  deleteRecipe,
};

export default recipe;
