import "./PatientPage.style.css"
import MedicineTracker from "../../components/MedicineTracker/MedicineTracker.component"
import Calendar from "../../components/Calendar/Calendar.component"
import PageOption from "../../components/PageOption/PageOption.component"
import {AppointmentsSVG, CallSVG, ScanSVG, TestResultSVG} from '../../components/SVG/SVG.component.jsx'
import { useMediaQuery } from "@uidotdev/usehooks"
import { getWidth } from "../../utils.js"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetMedicationQuery } from "../../redux/Api/aiTbApi.slice.js"

export const PatientPageLoader = () => {
  return null
}

const PatientPage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [medications, setMedications] = useState([])
  const {data: medication, isLoading, isSuccess: isMedicationQuerySuccess} = useGetMedicationQuery({
    isDoctor: false,
    patientId: null
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (isMedicationQuerySuccess) {
      setMedications(medication.data.medications)
    }
  }, [isMedicationQuerySuccess])


  const handleClick = (path) => {
    navigate(`/patient/${path}`)
  }


  //<ScanSVG width={ `${getWidth(30)}px` }/>
  return (
    <div className="patient-page">
      <div className="patient-page-title">
        <h2>Welcome, Phyo</h2>
      </div>
      <div className="patient-page-options">
        <PageOption label="AI Scan" width={85} onClick={() => handleClick('ai-scan')}>
          <ScanSVG width={ '50%' }/>
        </PageOption>
        <PageOption label="Test Results" width={85}>
          <TestResultSVG width={ '50%' } />
        </PageOption>
        <PageOption label="Appointments" width={85} onClick={() => handleClick('appointments')}>
          <AppointmentsSVG width={'50%'} />
        </PageOption>
        <PageOption label="Call" width={85}>
          <CallSVG width={'50%'} />
        </PageOption>
      </div>
      <div>
        {
          medications.map(medication => {
            return (
              <MedicineTracker medication={medication} key={medication.medicationId} width={180} isMobile={isMobile}  />
            )
          })
        }
        {
          !isMobile && (
            <Calendar width={`${getWidth(200)}px`} />
          )
        }
      </div>
      <div className="patient-page-near-clinics"></div>
    </div>
  )
}

export default PatientPage
