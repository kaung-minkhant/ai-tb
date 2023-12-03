import './Contacts.style.css'
import Log from '../Log/Log.component'
import {UserIcon} from '@heroicons/react/24/outline'
import { useGetPatientsQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, getUserAccessToken, getUserRole } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Contacts = () => {
  const {data: patients, isLoading, isSuccess} = useGetPatientsQuery()
  const [renders, setRenders] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const renderLogs = []
    if (isSuccess) {
      getPatients(patients.data.myPatients).then(details => {
        details.forEach(detail => {
          renderLogs.push(
            <Log key={detail.data.userId} name={`${detail.data.firstName} ${detail.data.lastName}`} id={detail.data.phone} icon={<UserIcon width={25}/>} onClick={() => handleClick({id: detail.data.userId, role: detail.data.roleId})} />
          )
        })
        setRenders(renderLogs)
      })
    }
  }, [isSuccess])
  function handleClick({id, role}) {
    navigate(`/doctor/call?callerId=${getUserId()}&callerRole=${getUserRole()}&recId=${id}&recRole=${role}`) 
    console.log('clicked')
  }
  if (isLoading) {
    return (
      <div>Contacts are loading</div>
    )
  }
  const getPatients = async (patients) => {
    const patientDetails = []
    for (const patient of patients) {
      const response = await axios.get(import.meta.env.VITE_URL + '/users/' + patient.patientId, {
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
      patientDetails.push(response.data)
    }
    return patientDetails
  }
  return (
      <div className="contacts">
        {
          renders
        }
      </div>
  )
}

export default Contacts