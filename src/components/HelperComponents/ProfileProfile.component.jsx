import './ProfileProfile.style.css'
const ProfileProfile = ({name="", imagePath=""}) => {
  return (
    <div className='patient-profile-profile'>
      <div className='patient-profile-img'>
        <img style={{
          width: '100%',
          height: '100%',
        }} src={imagePath}/> 
      </div>
      <span className='profile-name'>{name}</span>
    </div>
  )
}

export default ProfileProfile
