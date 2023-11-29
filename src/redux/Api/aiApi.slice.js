import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserAccessToken, getUserId } from "../../utils";

export const aiApiSlice = createApi({
  reducerPath: 'ai',
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_AI_URL}),
  endpoints: builder => ({
    uploadXray: builder.mutation({
      query: ({ dataURL }) => {
        console.log(dataURL)
        return {
          url: `/detect`,
          method: 'POST',
          body: {
            img: dataURL,
            userId: getUserId()
          },
          headers: {
            authorization: `Bearer ${getUserAccessToken()}`,
          }
        }
      }
    })
  })
})

export const {useUploadXrayMutation} = aiApiSlice