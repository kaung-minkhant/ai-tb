import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiTbApiSlice = createApi({
  reducerPath: 'ai_tb',
  baseQuery: fetchBaseQuery({baseUrl: "http://13.212.67.224:8080/"}),
  endpoints: builder => ({
    getPing: builder.query({
      query: () => '/'
    }),
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      })
   }),
   signup: builder.mutation({
      query: credentials => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      })
    })
  })
})

export const {useGetPingQuery, useLoginMutation, useSignupMutation} = aiTbApiSlice
