import { useMediaQuery } from '@uidotdev/usehooks'
import TestRecords from '../../components/TestRecords/TestRecords.component'
import './PatientProfilePage.style.css'
import MedicineTracker from '../../components/MedicineTracker/MedicineTracker.component'
import Log from '../../components/Log/Log.component.jsx'
import {UserIcon} from '@heroicons/react/24/outline'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'
import { getUserRole, getWidth } from '../../utils.js'
import Medications from '../../components/Medications/Medications.component.jsx'
import { useParams } from 'react-router-dom'
import { useCreateMedicationMutation, useGetMedicationQuery } from '../../redux/Api/aiTbApi.slice.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/User/user.slice.js'

const PatientProfilePage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const user = useSelector(selectUser)
  const [medications, setMedications] = useState([])
  const {patientId} = useParams()
  const isDoctor = window.location.href.includes('doctor')
  const [createMedication, {isSuccess: isMedicationMutationSuccess}] = useCreateMedicationMutation()
  const {data: medication, isLoading, isSuccess: isMedicationQuerySuccess} = useGetMedicationQuery({
    isDoctor: isDoctor,
    patientId: patientId
  })
  useEffect(() => {
    if (isMedicationQuerySuccess) {
      setMedications(medication.data.medications)
    }
  }, [isMedicationQuerySuccess])

  // console.log(medications)

  return (
    <div className='patient-profile'>
      <ProfileProfile name='Phyo Wai Wai' imagePath='./images/patient_profile.png' />
      <div className='patient-profile-buttons'></div>
      <div className='patient-profile-cards'>
        {
          +getUserRole() !== 2 && (
            <Log name={`Dr ${user.doctorName}`} id={`Doctor ID: ${user.doctorId}`} icon={<UserIcon width={20}/>} />
          )
        }
        <Log name={'Soe Kyaw Moe'} id={'Caregiver'} icon={<UserIcon width={20}/>} />
      </div>
      <div className='patient-profile-med-info'>
        <div>
          {
            medications.map(medication => {
              return (
                <MedicineTracker medication={medication} key={medication.medicationId} width={180} isMobile={isMobile} hideControl={true} />
              )
            })
          }
          {/* {
            !isMobile && (
              <Calendar width="300px" />
            )
          } */}
        </div>
        <div>
          <Medications 
            medications={medications} 
            isSuccess={isMedicationQuerySuccess} 
            isMutationSuccess={isMedicationMutationSuccess} 
            isDoctor={isDoctor}
            createMedication={createMedication}
            patientId={patientId}
          />
        </div>
        <div>
          <TestRecords width={`${getWidth(180)}px`} patientId={patientId}/> 
        </div>
      </div>
    </div>
  )
}

export default PatientProfilePage
