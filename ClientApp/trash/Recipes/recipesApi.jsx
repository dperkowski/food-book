import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/",
  }),
  endpoints: (builder) => ({
    GetRecipe: builder.query({
      query: () => `recipe`,
    }),
  }),
});

export const { useGetRecipeQuery } = recipesApi;
