import './DoctorPage.style.css'
import {AppointmentsSVG, CallSVG, ScanSVG, UsersSVG} from '../../components/SVG/SVG.component.jsx'
import PageOption from '../../components/PageOption/PageOption.component.jsx'
import { useNavigate } from 'react-router-dom'

const DocterPage = () => {
  const navigate = useNavigate()

  const handleClick = (path) => {
    navigate(`/doctor/${path}`)
  }
  return (
    <div className='doctor-page'>
      <div className="doctor-page-title">
        <h2>Welcome, Dr Phyo Phyo</h2>
      </div>
      <div className='doctor-page-options'>
        <PageOption label="AI Scan" onClick={() => handleClick('ai-scan')}>
          <ScanSVG width="140px" />
        </PageOption>
        <PageOption label="Patients" onClick={() => handleClick('patients')}>
          <UsersSVG width="140px" />
        </PageOption>
        <PageOption label="Appointments" onClick={() => handleClick('appointments')}>
          <AppointmentsSVG width="140px" />
        </PageOption>
        <PageOption label="Call" onClick={() => handleClick('calls')}>
          <CallSVG width="140px" />
        </PageOption>
      </div>
    </div>
  )
}

export default DocterPage
