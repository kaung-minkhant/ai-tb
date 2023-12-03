import './Contacts.style.css'
import Log from '../Log/Log.component'
import {UserIcon} from '@heroicons/react/24/outline'
import { useGetPatientsQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, getUserAccessToken, getUserRole } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Contacts = () => {
  const {data: patients, isLoading, isSuccess} = useGetPatientsQuery({role: getUserRole()})
  const [renders, setRenders] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    // if (isSuccess) {
      // const renderLogs = []
      // if (+getUserRole() === 1) {
      //   patients.data.doctors.forEach(detail => {
      //     renderLogs.push(
      //       <Log key={detail.doctorId} name={detail.doctorName} id={detail.doctorPhone} icon={<UserIcon width={25}/>} onClick={() => handleClick({id: detail.doctorId, role: 2})} />
      //     )
      //   })
      // } else {
      //   getPatients(patients.data.myPatients).then(details => {
      //     details.forEach(detail => {
      //       renderLogs.push(
      //         <Log key={detail.data.userId} name={`${detail.data.firstName} ${detail.data.lastName}`} id={detail.data.phone} icon={<UserIcon width={25}/>} onClick={() => handleClick({id: detail.data.userId, role: detail.data.roleId})} />
      //       )
      //     })
      //   })
      //   setRenders(renderLogs)
      // }
    // }
    const renderLogs = []
    if (isSuccess) {
      if (+getUserRole() === 1) {
        patients.data.doctors.forEach(detail => {
          renderLogs.push(
            <Log key={detail.doctorId} name={detail.doctorName} id={detail.doctorPhone} icon={<UserIcon width={25}/>} onClick={() => handleClick({id: detail.doctorId, role: 2})} />
          )
        })
        setRenders(renderLogs)
      } else {
        getPatients(patients.data.myPatients).then(details => {
          details.forEach(detail => {
            renderLogs.push(
              <Log key={detail.data.userId} name={`${detail.data.firstName} ${detail.data.lastName}`} id={detail.data.phone} icon={<UserIcon width={25}/>} onClick={() => handleClick({id: detail.data.userId, role: detail.data.roleId})} />
            )
          })
          setRenders(renderLogs)
        })
      }
    }
  }, [isSuccess])
  console.log(renders)
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