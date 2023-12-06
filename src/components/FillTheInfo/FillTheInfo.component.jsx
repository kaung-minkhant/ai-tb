import {  useNavigate } from 'react-router'
import './FillTheInfo.style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCities, fetchCountries, selectAllCountries, selectCities } from '../../redux/Countries/Countries.slice'
import { useUpdateProfileMutation } from '../../redux/Api/aiTbApi.slice'
import { setStorageValue } from '../../utils'
import toast from 'react-hot-toast'

const FillTheInfo = () => {
  const dispatch = useDispatch()
  const [updateProfile, {data: profile, isLoading: isProfileLoading, isSuccess: isProfileSuccess}] = useUpdateProfileMutation()
  const countries = useSelector(selectAllCountries)
  const cities = useSelector(selectCities)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [country, setCountry] = useState(0)
  const [city, setCity] = useState(0)
  const [address, setAddress] = useState(null)
  const [birthDate, setBirthDate] = useState(null)
  const [phone, setPhone] = useState(null)
  const [age, setAge] = useState(null)
  const [gender, setGender] = useState('male')
  const [race, setRace] = useState(null)



  useEffect(() => {
    if (isProfileSuccess) {
      setStorageValue('firstName', firstName)
      navigate('/patient')
      navigate(0)
    }
  }, [isProfileSuccess])

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const handleOnboarding = () => {
    const necessaryFields = {
      firstName, age, gender, birthDate, countries, 
      city, phone, race
    }
    const isComplete = Object.entries(necessaryFields).reduce((final, current) => {
      return final && Boolean(current[1]) 
    }, true)
    
    if (!isComplete) {
      toast.error('Plase get all the necessary information filled', {
        duration: 2000,
      })
      return
    }
    updateProfile({
      firstName,
      lastName,
      country,
      city,
      address,
      birthDate,
      phone,
      age,
      gender,
      race
    })
  }

  const handleCountryChange = (e) => {
    const countryObj = JSON.parse(e.target.value)
    const country = countryObj.name
    const code = countryObj.code
    setCountry(e.target.value)
    dispatch(fetchCities({code: code})) 
  }
  
  console.log('country', country)

  return (
    <div className='onboarding-wrapper'>
      <h2>Let's get all the necessary info filled!</h2>
      <div className='onboarding-inputs'>
        <label>
          <span>First Name<span style={{color: 'red'}}>*</span> </span>
          <input type='text' onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <span>Last Name</span>
          <input type='text' onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          <span>Age<span style={{color: 'red'}}>*</span> </span>
          <input type='number' onChange={e => setAge(e.target.value)} />
        </label>
        <label>
          <span>Gender<span style={{color: 'red'}}>*</span> </span> 
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>
        </label>
        <label>
          <span>Address</span>
          <input type='text' onChange={e => setAddress(e.target.value)} />
        </label>
        <label>
          <span>Date of Birth<span style={{color: 'red'}}>*</span> </span>
          <input type='date' onChange={e => setBirthDate(e.target.value)} />
        </label>
        <label>
          <span>Country<span style={{color: 'red'}}>*</span> </span> 
          <select value={country} onChange={handleCountryChange}>
            <option value={0} disabled>Select a country</option>
            {
              countries && countries.map(country => (
                <option key={country.name} value={JSON.stringify(country)}>{country.name}</option>
              ))
            }
          </select>
        </label>
        <label>
          <span>City<span style={{color: 'red'}}>*</span> </span> 
          <select value={city} onChange={e => setCity(e.target.value)} disabled={cities ? false : true}>
            <option value={0} disabled>Select a city</option>
            {
              cities && cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))
            }
          </select>
        </label>
        <label>
          <span>Phone<span style={{color: 'red'}}>*</span> </span>
          <input type='text' onChange={e => setPhone(e.target.value)} />
        </label>
        <label>
          <span>Race<span style={{color: 'red'}}>*</span> </span>
          <input type='text' onChange={e => setRace(e.target.value)} />
        </label>
      </div>
      <div className='onboarding-buttons'>
        <button className='btn' onClick={handleOnboarding}>Complete Onboarding</button>
      </div>
    </div>
  )
}

export default FillTheInfo