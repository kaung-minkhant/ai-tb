import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  'countries/fetchcountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    return response.data
  }
)

export const fetchCities = createAsyncThunk(
  'countries/fetchCities',
  async ({code}) => {
    const response = await axios.get(`https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500@public/records?where=country_code%3D%22${code}%22&apikey=8529825b952da3509a1551ba590bcbac9cfc6845cefc23a831dd72a8`)
    return response.data
  }
)

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: '',
    countryCodes: '',
    cities: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, () => {})
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const countryData = action.payload
        const countries = []
        const countryCodes = []
        countryData.sort((a, b) => {
        const nameA = a.name.common.toUpperCase(); 
        const nameB = b.name.common.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        countryData.forEach(country => {
          countries.push({
            name: country.name.common,
            code: country.cca2
          })
          countryCodes.push(country.cca2)   
        })
        // countries.join()
        // countries.sort()
        state.countries = countries
        state.countryCodes = countryCodes
      })
      .addCase(fetchCities.pending, () => {})
      .addCase(fetchCities.fulfilled, (state, action) => {
        const results = action.payload.results
        const cities = []
        results.forEach(result => {
          cities.push(result.name)
        })
        state.cities = cities
      })
  }
})

export default countriesSlice.reducer

export const selectCountries = state => state.countries

export const selectAllCountries = createSelector(
  [selectCountries],
  countries => countries.countries
)

export const selectCountryCodes = createSelector(
  [selectCountries],
  countries => countries.countryCodes
)

export const selectCities = createSelector(
  [selectCountries],
  countries => countries.cities
)