import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipesReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
  },
});
