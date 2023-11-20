import './DoctorAppointments.style.css'
import PageHeading from '../../components/HelperComponents/PageHeading.component'
import {CalendarDaysIcon} from '@heroicons/react/24/outline'
import DoctorAppointmentList from '../../components/DoctorAppointmentList/DoctorAppointmentList.component'

const DoctorAppointments = () => {
  return (
    <div className='doctor-appointments'>
      <PageHeading heading={'Appointments'} icon={<CalendarDaysIcon width={25} />} />
      <DoctorAppointmentList date={"19-Nov-2023"} />
    </div>
  )
}

export default DoctorAppointments