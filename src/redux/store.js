import { configureStore, createStore } from "@reduxjs/toolkit";
import SampleReducer from './Sample/Sample.slice'
import UserReducer from './User/user.slice'
import { aiTbApiSlice } from "./Api/aiTbApi.slice";
import {aiApiSlice} from './Api/aiApi.slice'

export const store = configureStore({
  reducer: {
    sample: SampleReducer,
    user: UserReducer,
    [aiTbApiSlice.reducerPath]: aiTbApiSlice.reducer,
    [aiApiSlice.reducerPath]: aiApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(aiTbApiSlice.middleware).concat(aiApiSlice.middleware)
})
