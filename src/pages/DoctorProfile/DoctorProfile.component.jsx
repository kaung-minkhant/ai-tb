import './DoctorProfile.style.css'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'
import InfoBox from '../../components/HelperComponents/InfoBox.component'

const DoctorProfile = () => {
  return (
    <div className='doctor-profile'>
      <ProfileProfile name='Dr Kyaw Kyaw Moe' imagePath='./images/patient_profile.png' />
      <div className='doctor-profile-buttons'></div>
      <div className='doctor-info'>
        <InfoBox label='Background' text={"Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. "} />
        <InfoBox label='Contact Information' text={"Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. "} />
      </div>
    </div>
  )
}

export default DoctorProfile
