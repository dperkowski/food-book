import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import counterReducer from "./counter";
import { recipesApi } from "./recipesApi";

export const recipesStore = configureStore({
  reducer: {
    counter: counterReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});

setupListeners(recipesStore.dispatch);
