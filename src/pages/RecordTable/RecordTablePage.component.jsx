import "./RecordTablePage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import {useGetOneRecordQuery} from "../../redux/Api/aiTbApi.slice"

export const RecordTablePageLoader = () =>{
    return null
}

const RecordTablePage = ( {width='300px'}) =>{
    const [Data, setData] = useState([])

    const {recordId} = useParams()
    console.log('recordId', recordId)
    const { data, isLoading, isSuccess } = useGetOneRecordQuery({
        recordId: recordId
    });
    
    useEffect(() => {
        if (isSuccess) {
            console.log("hee")
            setData(data?.data.record)
        }
    }, [isSuccess])
    console.log('isSuccess', isSuccess)
    console.log('data', data?.data.record)
    console.log('Data', Data)
    if (!data){
        return (<h1>LOADING</h1>)
    }
    return (
        <div className="records" style={{"--min-width": width}}>
                 
            <div className="details">
                <h1 className="title">Record View</h1>   
                <h2>{Data.type}</h2>
                <p>
                    <strong>Record ID:</strong> {Data.recordId}
                </p>
                <p>
                    <strong>Record Date:</strong> {new Date(Data.recordDate).toLocaleString()}
                </p>
                <p>
                    <strong>Lab Name:</strong> {Data.labName}
                </p>
                <p>
                    <strong>Lab Address:</strong> {Data.labAddress}
                </p>
            </div>

            <div className = "table-container">
                <table className="table" border="1">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Low Range</th>
                        <th>High Range</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Data.Tests && Data.Tests.map((test) => (
                        <tr key={test.testId}>
                        <td>{test.name}</td>
                        <td>{test.value}</td>
                        <td>{test.unit}</td>
                        <td>{test.lowRange}</td>
                        <td>{test.highRange}</td>
                        <td>{new Date(test.date).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="btns">Download HL7</div>
        </div>
    )
}

export default RecordTablePage