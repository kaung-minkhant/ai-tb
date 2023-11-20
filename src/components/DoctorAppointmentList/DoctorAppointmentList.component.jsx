import Log from '../Log/Log.component'
import './DoctorAppointmentList.style.css'
const DoctorAppointmentList = ({date}) => {
  return (
    <div className="doctor-appointment-list">
      <div className="doctor-appointment-title">
        {date}{new Date(date).toDateString() === new Date().toDateString() && ' (Today)'} 
      </div>
      <div className="doctor-appointment-list-items">
        <Log name={"Aung Pyae"} id={'PID003'} time={"9:00 AM"}/> 
        <Log name={"Phoe Hla"} id={'PID004'} time={"10:00 AM"}/> 
        <Log name={"Phoe Wa"} id={'PID005'} time={"11:00 AM"}/> 
        <Log name={"Aung Chan Myae"} id={'PID006'} time={"12:00 PM"}/> 
      </div>
    </div>
  )
}

export default DoctorAppointmentList