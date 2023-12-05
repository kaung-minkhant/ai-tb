import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserAccessToken } from "../../utils";

export const aiTbApiSlice = createApi({
  reducerPath: 'ai_tb',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_URL }),
  tagTypes: ['medTrackers', 'profile', 'scans'],
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
    updateProfile: builder.mutation({
      query: body => ({
        url: '/myprofile',
        method: 'PATCH',
        body: body,
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      }),
      invalidatesTags: ['profile']
    }),
    getProfile: builder.mutation({
      query: role => ({
        url: '/myprofile',
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      }),
      providesTags: ['profile']
    }),
    getDoctor: builder.mutation({
      query: () => ({
        url: '/myprofile/mydoctors',
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    getPatients: builder.query({
      query: ({role}) => ({
        url: +role === 2 ? '/myprofile/mypatients' : '/myprofile/mydoctors',
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
    createCallLog: builder.mutation({
      query: ({doctorId, patientId}) =>({
        url: '/calls',
        method: 'POST',
        body: {
          doctorId: doctorId,
          patientId: patientId,
          caregiverId: '',
        },
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    createMedication: builder.mutation({
      query: ({ patientId, data }) => {
        return {
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
        }
      }
    }),
    getMedication: builder.query({
      query: ({ isDoctor, patientId }) => ({
        url: isDoctor ? `/users/${patientId}/medications` : `/myprofile/medications/`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      }),
      providesTags: ['medTrackers']
    }),
    takeMedication: builder.mutation({
      query: (medId) => ({
        url: `/myprofile/medications/${medId}/trackers`,
        body: {
          doseTime: new Date().toDateString(),
        },
        method: 'POST',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      }),
      invalidatesTags: ['medTrackers']
    }),
    getScans: builder.query({
      query: (id) => ({
        url: `/users/${id}/ai`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      }),
      providesTags: ['scans']
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
      },
      invalidatesTags: ['scans']
    }),
    getClinics: builder.mutation({
      query: ({country, city}) => ({
        url: `/clinics?country=${country}&city=${city}`,
        method: 'GET',
      })
    }),
    getCountries: builder.query({
      query: () => ({
        url: `/countries`,
        method: 'GET',
        
      })
    }),
    getRecords: builder.query({
      query: ({ isDoctor, patientId }) => ({
        url: isDoctor ? `/users/${patientId}/records` : `/myprofile/records/`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    getOneRecord: builder.query({
      query: ({recordId}) => ({
        url: `/records/${recordId}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    getAllData: builder.query({
      query: () => ({
        url: `/data`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
    addUserToMyProfile: builder.mutation({
      query: ({userId}) => ({
        url: '/adduser?userId='+userId,
        method: 'POST',
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
    }),
  }),
})

export const { useGetPingQuery, useLoginMutation, useSignupMutation,
  useGetPatientsQuery, useGetCallLogsQuery, useCreateMedicationMutation,
  useTakeMedicationMutation,
  useGetMedicationQuery, useGetClinicsMutation, useGetCountriesQuery, useGetRecordsQuery, useGetOneRecordQuery,
  useGetProfileMutation, useGetDoctorMutation, useGetAllDataQuery, useCreateCallLogMutation,
  useUpdateProfileMutation, useGetScansQuery, useAddUserToMyProfileMutation
} = aiTbApiSlice
