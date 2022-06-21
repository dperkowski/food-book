import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "animeListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.jikan.moe/v4",
  }),
  endpoints: (builder) => ({
    GetUser: builder.query({
      query: (id) => `anime/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
