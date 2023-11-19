import "./PatientPage.style.css"
import MedicineTracker from "../../components/MedicineTracker/MedicineTracker.component"
import Calendar from "../../components/Calendar/Calendar.component"
import PageOption from "../../components/PageOption/PageOption.component"
import {AppointmentsSVG, CallSVG, ScanSVG, TestResultSVG} from '../../components/SVG/SVG.component.jsx'
import { useMediaQuery } from "@uidotdev/usehooks"

export const PatientPageLoader = () => {
  return null
}

const PatientPage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  return (
    <div className="patient-page">
      <div className="patient-page-title">
        <h2>Welcome, Phyo</h2>
      </div>
      <div>
        <MedicineTracker width="300px" isMobile={isMobile} />
        {
          !isMobile && (
            <Calendar width="300px" />
          )
        }
      </div>
      <div className="patient-page-options">
        <PageOption label="AI Scan">
          <ScanSVG width="140px" />
        </PageOption>
        <PageOption label="Test Results">
          <TestResultSVG width="140px" />
        </PageOption>
        <PageOption label="Appointments">
          <AppointmentsSVG width="140px" />
        </PageOption>
        <PageOption label="Call">
          <CallSVG width="140px" />
        </PageOption>
      </div>
      <div className="patient-page-near-clinics"></div>
      {/* <div className="patient-page-column"> */}
      {/*   <AiScan width="300px" /> */}
      {/*   <TestRecords width="300px" /> */}
      {/* </div> */}
      {/* <div className="patient-page-column"> */}
      {/* </div> */}
    </div>
  )
}

export default PatientPage
