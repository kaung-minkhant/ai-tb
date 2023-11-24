import { useMediaQuery } from '@uidotdev/usehooks'
import TestRecords from '../../components/TestRecords/TestRecords.component'
import './PatientProfilePage.style.css'
import MedicineTracker from '../../components/MedicineTracker/MedicineTracker.component'
import Log from '../../components/Log/Log.component.jsx'
import {UserIcon} from '@heroicons/react/24/outline'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'
import { getWidth } from '../../utils.js'
import Medications from '../../components/Medications/Medications.component.jsx'
import { useParams } from 'react-router-dom'

const PatientProfilePage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const {patientId} = useParams()
  return (
    <div className='patient-profile'>
      <ProfileProfile name='Phyo Wai Wai' imagePath='./images/patient_profile.png' />
      <div className='patient-profile-buttons'></div>
      <div className='patient-profile-cards'>
        <Log name={'Dr Kyaw Kyaw Moe'} icon={<UserIcon width={20}/>} />
        <Log name={'Soe Kyaw Moe'} id={'Caregiver'} icon={<UserIcon width={20}/>} />
      </div>
      <div className='patient-profile-med-info'>
        <div>
          <MedicineTracker width={180} isMobile={isMobile} hideControl={true} />
          {/* {
            !isMobile && (
              <Calendar width="300px" />
            )
          } */}
        </div>
        <div>
          <Medications patientId={patientId}/>
        </div>
        <div>
          <TestRecords width={`${getWidth(180)}px`} /> 
        </div>
      </div>
    </div>
  )
}

export default PatientProfilePage
