import "./RecordsPage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useEffect, useState } from 'react'
import Log from "../../components/Log/Log.component"
import { useNavigate, useParams } from "react-router-dom"
import { useGetRecordsQuery } from "../../redux/Api/aiTbApi.slice"
import { getUser, getUserRole } from "../../utils"

export const RecordsPageLoader = () => {
    return null
}

const RecordsPage = ({width = '300px'}) => {
    const [Data, setData] = useState([])
    const navigate = useNavigate()
    const {patientId} = useParams()
    console.log('isDoctor', location.href.includes('doctor'))
    console.log('patientId', patientId)
    const { data, isLoading, isSuccess } = useGetRecordsQuery({
        isDoctor: location.href.includes('doctor'),
        patientId: patientId
    });

    useEffect(() => {
        if (isSuccess) {
          if (+getUserRole() === 2) {
            setData(data.data.records.records)
          } else {
            setData(data.data.records)
          }
        }
    }, [isSuccess])
    const handleClick = (key) => {
      navigate(`${key}`)
    }
    return(
        <div className="records">
            <div className="title">
                <p>Records</p>
            </div>
            <div className="name">Owner ID: {Data[0]?.userId}</div>
            <div className="logs">
                {
                    Data.map((data) => (
                        <Log key={data.recordId} onClick={() => handleClick(data.recordId)} name={data.type} id={"Lab: "+data.labName} time={new Date(data.createdAt).toLocaleString()}/>
                    ))
                }
            </div>
        </div>
    )
}

export default RecordsPage