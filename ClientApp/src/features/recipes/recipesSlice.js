import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipesService from "./recipesService";

// Get recipes from localStorage
const recipes = JSON.parse(localStorage.getItem("recipes"));

const initialState = {
  recipes: recipes ? recipes : null,
  isError: false,
  isSuccess: false,
  osLoading: false,
  message: "",
};

// addRecipe
export const addRecipe = createAsyncThunk(
  "recipes/addrecipes",
  async (recipes, thunkAPI) => {
    try {
      return await recipesService.addRecipe(recipes);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// loadRecipe
export const loadRecipe = createAsyncThunk(
  "recipes/loadrecipes",
  async (recipes, thunkAPI) => {
    try {
      return await recipesService.loadRecipe(recipes);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete recipes
export const deleteRecipes = createAsyncThunk(
  "recipes/deleterecipe",
  async () => recipesService.deleteRecipes()
);

export const recipesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessS = false;
        state.recipes = action.payload;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recipes = null;
      })
      .addCase(loadRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessS = false;
        state.recipes = action.payload;
      })
      .addCase(loadRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recipes = null;
      })
      .addCase(deleteRecipes.fulfilled, (state) => {
        state.recipes = null;
      });
  },
});

export const { reset } = recipesSlice.actions;
export default recipesSlice.reducer;
