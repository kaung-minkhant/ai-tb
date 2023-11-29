import { useEffect, useState } from 'react'
import PageHeading from '../../components/HelperComponents/PageHeading.component'
import Log from '../../components/Log/Log.component'
import { useGetPatientsQuery } from '../../redux/Api/aiTbApi.slice'
import './DoctorPatientsPage.style.css'
import {UsersIcon, UserIcon} from '@heroicons/react/24/outline'
import axios from 'axios'
import { getUserAccessToken } from '../../utils'
import { useNavigate } from 'react-router-dom'

const DoctorPatientsPage = () => {
  const {data: patients, isLoading, isSuccess} = useGetPatientsQuery()
  const [renders, setRenders] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const renderLogs = []
    if (isSuccess) {
      getPatients(patients.data.myPatients).then(details => {
        details.forEach(detail => {
          renderLogs.push(
            <Log key={detail.data.userId} name={`${detail.data.firstName} ${detail.data.lastName}`} id={`Patient ID: ${detail.data.userId}`} icon={<UsersIcon width={25}/>} onClick={() => handleClick(detail.data.userId)}/>
          )
        })
        setRenders(renderLogs)
      })
    }
  }, [isSuccess])
  function handleClick(patientId) {
    navigate(`/doctor/patients/${patientId}`)
  }
  if (isLoading) {
    return (
      <div>Patients are loading</div>
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
    <div className='doctor-patients-page'>
      <PageHeading heading={'Your Patients'} icon={<UsersIcon width={25}/>} />
      <div className='doctor-patients'>
        {
          renders
        }
        {/* <Log name={"Aung Pyae"} id={'PID003'} icon={<UserIcon width={20} />}/> 
        <Log name={"Phoe Hla"} id={'PID004'} icon={<UserIcon width={20} />}/> 
        <Log name={"Phoe Wa"} id={'PID005'} icon={<UserIcon width={20} />}/> 
        <Log name={"Aung Chan Myae"} id={'PID006'} icon={<UserIcon width={20} />}/> 
        <Log name={"Pyae Sone"} id={'PID007'} icon={<UserIcon width={20} />}/> 
        <Log name={"Shwe Lin Latt"} id={'PID013'} icon={<UserIcon width={20} />}/>  */}
      </div>
    </div>
  )
}

export default DoctorPatientsPage