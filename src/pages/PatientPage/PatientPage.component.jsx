import "./PatientPage.style.css"
import MedicineTracker from "../../components/MedicineTracker/MedicineTracker.component"
import TestRecords from "../../components/TestRecords/TestRecords.component"
import AiScan from "../../components/AiScan/AiScan.component"
import { getUser } from "../../utils"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Calendar from "../../components/Calendar/Calendar.component"
import { useMediaQuery } from "@uidotdev/usehooks"

export const PatientPageLoader = () => {
  return null
}

const PatientPage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  return (
    <div className="patient-page">
      <div className="patient-page-column">
        <AiScan width="300px" />
        <TestRecords width="300px" />
      </div>
      <div className="patient-page-column">
        <MedicineTracker width="300px" isMobile={isMobile} />
        {
          !isMobile && (
            <Calendar width="300px" />
          )
        }
      </div>
    </div>
  )
}

export default PatientPage
