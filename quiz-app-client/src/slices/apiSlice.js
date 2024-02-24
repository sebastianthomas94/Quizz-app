import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ data }) => ({
        url: "/user/signup",
        method: "post",
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: "/user/signin",
        method: "post",
        body: data,
      }),
    }),
    getQuestians: builder.mutation({
      query: () => ({
        url: "/quiz/questians",
        method: "get"
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGetQuestiansMutation } = api;
