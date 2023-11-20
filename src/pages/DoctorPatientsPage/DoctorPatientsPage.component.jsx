import PageHeading from '../../components/HelperComponents/PageHeading.component'
import Log from '../../components/Log/Log.component'
import './DoctorPatientsPage.style.css'
import {UsersIcon, UserIcon} from '@heroicons/react/24/outline'

const DoctorPatientsPage = () => {
  return (
    <div className='doctor-patients-page'>
      <PageHeading heading={'Your Patients'} icon={<UsersIcon width={25}/>} />
      <div className='doctor-patients'>
        <Log name={"Aung Pyae"} id={'PID003'} icon={<UserIcon width={20} />}/> 
        <Log name={"Phoe Hla"} id={'PID004'} icon={<UserIcon width={20} />}/> 
        <Log name={"Phoe Wa"} id={'PID005'} icon={<UserIcon width={20} />}/> 
        <Log name={"Aung Chan Myae"} id={'PID006'} icon={<UserIcon width={20} />}/> 
        <Log name={"Pyae Sone"} id={'PID007'} icon={<UserIcon width={20} />}/> 
        <Log name={"Shwe Lin Latt"} id={'PID013'} icon={<UserIcon width={20} />}/> 
      </div>
    </div>
  )
}

export default DoctorPatientsPage