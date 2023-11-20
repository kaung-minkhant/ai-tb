import { useMediaQuery } from '@uidotdev/usehooks'
import TestRecords from '../../components/TestRecords/TestRecords.component'
import './PatientProfilePage.style.css'
import MedicineTracker from '../../components/MedicineTracker/MedicineTracker.component'
import Log from '../../components/Log/Log.component.jsx'
import {UserIcon} from '@heroicons/react/24/outline'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'

const PatientProfilePage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
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
          <MedicineTracker width="300px" isMobile={isMobile} hideControl={true} />
          {
            !isMobile && (
              <Calendar width="300px" />
            )
          }
        </div>
        <div>
          <TestRecords width='300px' /> 
        </div>
      </div>
    </div>
  )
}

export default PatientProfilePage
