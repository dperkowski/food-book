import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

// Get recipe from localStorage
const recipe = JSON.parse(localStorage.getItem("recipe"));
const userRecipe = JSON.parse(localStorage.getItem("userRecipe"));

const initialState = {
  recipe: recipe ? recipe : null,
  userRecipe: userRecipe ? userRecipe : null,
  isError: false,
  isSuccess: false,
  osLoading: false,
  message: "",
};

// addRecipe
export const addRecipe = createAsyncThunk(
  "recipe/addrecipe",
  async (recipe, thunkAPI) => {
    try {
      return await recipeService.addRecipe(recipe);
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
  "recipe/loadrecipe",
  async (recipe, thunkAPI) => {
    try {
      return await recipeService.loadRecipe(recipe);
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

// Load user recipes
export const loadUserRecipe = createAsyncThunk(
  "recipe/loaduserrecipe",
  async (userRecipe, thunkAPI) => {
    try {
      return await recipeService.loadUserRecipe(userRecipe);
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

// Delete recipe
export const deleteRecipe = createAsyncThunk(
  "recipe/deleterecipe",
  async (recipeData) => recipeService.deleteRecipe(recipeData)
);

export const recipeSlice = createSlice({
  name: "recipe",
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
        state.userRecipe = action.payload;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userRecipe = null;
      })
      .addCase(loadRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessS = false;
        state.recipe = action.payload;
      })
      .addCase(loadRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recipe = null;
      })
      .addCase(loadUserRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessS = false;
        state.userRecipe = action.payload;
      })
      .addCase(loadUserRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userRecipe = null;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.userRecipe = null;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
