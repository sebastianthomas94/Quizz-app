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
      query: ({ questianNumber, prevAnswer, skip }) => ({
        url: "/quiz/questians",
        method: "get",
        params: {
          questianNumber,
          prevAnswer, 
          skip// Include questianNumber as a query parameter
        },
      }),
    }),
    getRank: builder.mutation({
      query: () => ({
        url: "/data/rank",
        method: "get",
      }),
    }),
    getPreviousQuizzes: builder.mutation({
      query: () => ({
        url: "/data/prevquiz",
        method: "get",
      }),
    }),
    getLeaderboard: builder.mutation({
      query: () => ({
        url: "/data/leaderboard",
        method: "get",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "get",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetQuestiansMutation,
  useGetRankMutation,
  useGetPreviousQuizzesMutation,
  useGetLeaderboardMutation,
  useLogoutMutation,
} = api;
