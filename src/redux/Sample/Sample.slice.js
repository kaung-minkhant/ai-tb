import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSamples = createAsyncThunk("sample/fetchSamples", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/post")
  return response.data
})

const sampleSlice = createSlice({
  name: 'sample',
  initialState: [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    },
  ],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSamples.pending, (state, action) => {

      })
      .addCase(fetchSamples.fulfilled, (state, action) => {
        console.log('response:', action.payload)
        return action.payload
      })
      .addCase(fetchSamples.rejected, (state, action) => {
        console.log('error:', action.payload)
      })
  }
})

export default sampleSlice.reducer
