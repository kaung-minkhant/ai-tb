import { configureStore, createStore } from "@reduxjs/toolkit";
import SampleReducer from './Sample/Sample.slice'
import UserReducer from './User/user.slice'
import { aiTbApiSlice } from "./Api/aiTbApi.slice";
import {aiApiSlice} from './Api/aiApi.slice'
import CountriesReducer from './Countries/Countries.slice'

export const store = configureStore({
  reducer: {
    sample: SampleReducer,
    user: UserReducer,
    [aiTbApiSlice.reducerPath]: aiTbApiSlice.reducer,
    [aiApiSlice.reducerPath]: aiApiSlice.reducer,
    countries: CountriesReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(aiTbApiSlice.middleware).concat(aiApiSlice.middleware)
})
