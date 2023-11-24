import "./PatientPage.style.css"
import MedicineTracker from "../../components/MedicineTracker/MedicineTracker.component"
import Calendar from "../../components/Calendar/Calendar.component"
import PageOption from "../../components/PageOption/PageOption.component"
import {AppointmentsSVG, CallSVG, ScanSVG, TestResultSVG} from '../../components/SVG/SVG.component.jsx'
import { useMediaQuery } from "@uidotdev/usehooks"
import { getWidth } from "../../utils.js"
import { useNavigate } from "react-router-dom"

export const PatientPageLoader = () => {
  return null
}

const PatientPage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const navigate = useNavigate()
  const handleClick = (path) => {
    navigate(`/patient/${path}`)
  }
  return (
    <div className="patient-page">
      <div className="patient-page-title">
        <h2>Welcome, Phyo</h2>
      </div>
      <div>
        <MedicineTracker width={ 180 } isMobile={isMobile} />
        {
          !isMobile && (
            <Calendar width={`${getWidth(200)}px`} />
          )
        }
      </div>
      <div className="patient-page-options">
        <PageOption label="AI Scan" width={85} onClick={() => handleClick('ai-scan')}>
          <ScanSVG width={ `${getWidth(70)}px` }/>
        </PageOption>
        <PageOption label="Test Results" width={85}>
          <TestResultSVG width={ `${getWidth(70)}px` } />
        </PageOption>
        <PageOption label="Appointments" width={85} onClick={() => handleClick('appointments')}>
          <AppointmentsSVG width={`${getWidth(70)}px`} />
        </PageOption>
        <PageOption label="Call" width={85}>
          <CallSVG width={`${getWidth(70)}px`} />
        </PageOption>
      </div>
      <div className="patient-page-near-clinics"></div>
    </div>
  )
}

export default PatientPage
