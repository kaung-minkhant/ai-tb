import "./MapPage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import Map from "../../components/Map/Map.component";
import { useGetClinicsMutation, useGetCountriesQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'

export const MapPageLoader = () => {
  return null
}

const MapPage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)");
  const [getClinic, { data: clinicData, isLoading: isGetClinicLoading, isSuccess: isGetClinicSuccess }] = useGetClinicsMutation()
  const { data: countryData, isLoading: isCountryLoading, isSuccess: isCountrySuccess } = useGetCountriesQuery()
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [Countries, setCountries] = useState(null);
  const [Data, setData] = useState(null)

  useEffect(() => {
    if (isCountrySuccess) {
      let countries = countryData.data.countries;
      setCountries(countries)
      const selectedCountryData = countries.find(
        (country) => country.name === selectedCountry
      );
      console.log('selectedCountry', selectedCountryData)
      if (selectedCountryData) {
        setCities(selectedCountryData.Cities);
        // setSelectedCity('');
      }
    }
  }, [isCountrySuccess, selectedCountry])

  console.log('countries', Countries)
  console.log('cities', cities)
  console.log('selected city', selectedCity)

  useEffect(() => {
    if(isGetClinicSuccess){
      setData(clinicData.data.clinics)
    }
  }, [isGetClinicSuccess])

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    getClinic({country: selectedCountry, city: e.target.value})
  };
  return (

    <div className="map-page">
      <div className="top">
        <h1 className="title">Nearby Clinics</h1>
        <p className="desc">The nearby clinics that support, diagnose and cure pulmonary TB are listed below. Please match the location and click on each clinic to view more details.</p>
      </div>
      <div className="location">
        <select
          className="dropdown"
          name="country"
          id="country"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          <option value="">Select Country</option>
          {Countries?.map((country) => (
            <option key={country.countryId} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          name="city"
          id="city"
          onChange={handleCityChange}
          value={selectedCity}
          disabled={!selectedCountry}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.cityId} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="map" id="map">
        <Map Data={Data} />
      </div>
    </div>
  )
}

export default MapPage;