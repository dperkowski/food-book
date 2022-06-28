import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

// Get recipe from localStorage
const recipe = JSON.parse(localStorage.getItem("recipe"));

const initialState = {
  recipe: recipe ? recipe : null,
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

// Delete recipe
export const deleteRecipe = createAsyncThunk(
  "recipe/deleterecipe",
  async (recipeData) => recipeService.deleteRecipe(recipeData)
);

export const recipeSlice = createSlice({
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
        state.recipe = action.payload;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recipe = null;
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
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.recipe = null;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
