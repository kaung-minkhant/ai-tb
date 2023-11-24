import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserAccessToken } from "../../utils";

export const aiTbApiSlice = createApi({
  reducerPath: 'ai_tb',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_URL }),
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
    }),
    getPatients: builder.query({
      query: () => ({
        url: '/myprofile/mypatients',
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    getCallLogs: builder.query({
      query: () => ({
        url: `/myprofile/calls`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })  
    }),
    createMedication: builder.mutation({
      query: ({patientId, data}) => ({
        url: `/users/${patientId}/medications`,
        method: 'POST',
        body: {
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          repeatsEvery: data.repeatsEvery,
          dailyDose: 1
        },
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    getMedication: builder.query({
      query: ({patientId}) => ({
        url: `/users/${patientId}/medications`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    uploadXray: builder.mutation({
      query: ({ dataURL }) => {
        return {
          url: `/images`,
          method: 'POST',
          body: {
            img: dataURL
          },
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          }
        }
      }
    })
  }),
})

export const { useGetPingQuery, useLoginMutation, useSignupMutation, useUploadXrayMutation, 
  useGetPatientsQuery, useGetCallLogsQuery, useCreateMedicationMutation,
  useGetMedicationQuery
} = aiTbApiSlice
