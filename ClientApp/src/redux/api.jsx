import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
