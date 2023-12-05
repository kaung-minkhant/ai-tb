import './DoctorPage.style.css'
import {AppointmentsSVG, CallSVG, ScanSVG, UsersSVG} from '../../components/SVG/SVG.component.jsx'
import PageOption from '../../components/PageOption/PageOption.component.jsx'
import { useNavigate } from 'react-router-dom'
import { getWidth } from '../../utils.js'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/User/user.slice.js'

const DocterPage = () => {
  const navigate = useNavigate()
  const doctorName = useSelector(selectUserName)

  const handleClick = (path) => {
    navigate(`/doctor/${path}`)
  }
  return (
    <div className='doctor-page'>
      <div className="doctor-page-title">
        <h2>Welcome, Dr {doctorName}</h2>
      </div>
      <div className='doctor-page-options'>
        <PageOption label="AI Scan" onClick={() => handleClick('ai-scan')} width={85}>
          <ScanSVG width={'50%'} />
        </PageOption>
        <PageOption label="Patients" onClick={() => handleClick('patients')} width={85}>
          <UsersSVG width={'50%'} />
        </PageOption>
        <PageOption label="Appointments" onClick={() => handleClick('appointments')} width={85}>
          <AppointmentsSVG width={'50%'} />
        </PageOption>
        <PageOption label="Call" onClick={() => handleClick('calls')} width={85}>
          <CallSVG width={'50%'} />
        </PageOption>
      </div>
    </div>
  )
}

export default DocterPage
