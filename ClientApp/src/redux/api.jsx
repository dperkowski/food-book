import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/",
  }),
  endpoints: (builder) => ({
    GetUser: builder.query({
      query: () => `user`,
    }),
    GetRecipe: builder.query({
      query: () => `recipe`,
    }),
  }),
});

export const { useGetUserQuery, useGetRecipeQuery } = userApi;
