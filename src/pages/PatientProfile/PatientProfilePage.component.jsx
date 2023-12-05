import { useMediaQuery } from '@uidotdev/usehooks'
import TestRecords from '../../components/TestRecords/TestRecords.component'
import './PatientProfilePage.style.css'
import MedicineTracker from '../../components/MedicineTracker/MedicineTracker.component'
import Log from '../../components/Log/Log.component.jsx'
import {UserIcon} from '@heroicons/react/24/outline'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'
import { getUserRole, getWidth } from '../../utils.js'
import Medications from '../../components/Medications/Medications.component.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { useCreateMedicationMutation, useGetMedicationQuery } from '../../redux/Api/aiTbApi.slice.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, selectUserName } from '../../redux/User/user.slice.js'

const PatientProfilePage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const user = useSelector(selectUser)
  const username = useSelector(selectUserName)
  const {state} = useLocation()
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
      <ProfileProfile name={ state?.userId ? `${state.firstName} ${state.lastName}` : username} imagePath='./images/patient_profile.png' />
      
      <div className="grids-container">
        <div className="left-grid">
          {/* <div className='patient-profile-buttons'></div> */}
            <div className='patient-profile-cards'>
              {
                +getUserRole() !== 2 && (
                  <div className='doctor-container'>
                    <h5 className='doctor-title'>Your Doctor</h5>
                    <Log name={`Dr ${user.doctorName}`} id={`Doctor ID: ${user.doctorId}`} icon={<UserIcon width={20}/>} />
                  </div>
                )
              }
              {/* <Log name={'Soe Kyaw Moe'} id={'Caregiver'} icon={<UserIcon width={20}/>} /> */}
          </div>

          <div className="med-info-gap">
            <h5 className='doctor-title'>Medication History</h5>
            {
              medications.map(medication => {
                return (
                  <MedicineTracker medication={medication} key={medication.medicationId} width={180} isMobile={isMobile} hideControl={true} isDoctor={isDoctor} patientId={patientId}/>
                )
              })
            }
            {/* {
              !isMobile && (
                <Calendar width="300px" />
              )
            } */}
          </div>
        </div>
        <div className="right-grid">

            
        <div className='patient-profile-med-info'>
        
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

      </div>
      
      
    </div>
  )
}

export default PatientProfilePage
