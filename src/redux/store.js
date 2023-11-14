import { configureStore, createStore } from "@reduxjs/toolkit";
import SampleReducer from './Sample/Sample.slice'
import UserReducer from './User/user.slice'
import { apiSlice } from "./Api/apiSlice.slice";
import { aiTbApiSlice } from "./Api/aiTbApi.slice";

export const store = configureStore({
  reducer: {
    sample: SampleReducer,
    user: UserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [aiTbApiSlice.reducerPath]: aiTbApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware).concat(aiTbApiSlice.middleware)
  
})
