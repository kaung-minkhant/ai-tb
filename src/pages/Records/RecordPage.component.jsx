import "./RecordPage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useEffect, useState } from 'react'

export const RecordPageLoader = () =>{
    return null
}

const RecordPage = ( {width='300px'}) =>{

    const record = {
        "recordId": 1,
        "userId": 1,
        "recordDate": "2023-11-27T10:21:24.000Z",
        "type": "Blood Test",
        "labName": "Shwe Yaung Ne",
        "labAddress": "12, Latha, Upper Block, Yangon, Myanmar",
        "issuedBy": "2",
        "name": null,
        "createdAt": "2023-11-27T10:21:24.000Z",
        "updatedAt": "2023-11-27T10:21:24.000Z",
        "deletedAt": null,
        "Tests": [
            {
                "testId": 1,
                "recordId": 1,
                "name": "White Blood Cell Count (WBC)",
                "value": 12000,
                "unit": "cells/mcL",
                "lowRange": 4000,
                "highRange": 11000,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 2,
                "recordId": 1,
                "name": "Red Blood Cell Count (RBC)",
                "value": 4.3,
                "unit": "million cells/mcL",
                "lowRange": 4.5,
                "highRange": 5.5,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 3,
                "recordId": 1,
                "name": "Hemoglobin (Hb)",
                "value": 11.5,
                "unit": "g/dL",
                "lowRange": 12,
                "highRange": 16,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 4,
                "recordId": 1,
                "name": "Platelet Count",
                "value": 180000,
                "unit": "cells/mcL",
                "lowRange": 150000,
                "highRange": 450000,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 5,
                "recordId": 1,
                "name": "Blood Glucose (Fasting)",
                "value": 90,
                "unit": "mg/dL",
                "lowRange": 70,
                "highRange": 100,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 6,
                "recordId": 1,
                "name": "Total Cholesterol",
                "value": 180,
                "unit": "mg/dL",
                "lowRange": 0,
                "highRange": 200,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 7,
                "recordId": 1,
                "name": "ALT (Alanine Aminotransferase)",
                "value": 35,
                "unit": "units/L",
                "lowRange": 7,
                "highRange": 56,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            },
            {
                "testId": 8,
                "recordId": 1,
                "name": "TSH (Thyroid Stimulating Hormone)",
                "value": 2.5,
                "unit": "mIU/L",
                "lowRange": 0.4,
                "highRange": 4,
                "date": "2023-11-27T10:21:24.000Z",
                "createdAt": "2023-11-27T10:21:24.000Z",
                "updatedAt": "2023-11-27T10:21:24.000Z",
                "deletedAt": null
            }
        ]
    }

    return (
        <div className="records" style={{"--min-width": width}}>
                 
            <div className="details">
                <h1 className="title">Records</h1>   
                <h2>{record.type}</h2>
                <p>
                    <strong>Record ID:</strong> {record.recordId}
                </p>
                <p>
                    <strong>Record Date:</strong> {new Date(record.recordDate).toLocaleString()}
                </p>
                <p>
                    <strong>Lab Name:</strong> {record.labName}
                </p>
                <p>
                    <strong>Lab Address:</strong> {record.labAddress}
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
                    {record.Tests.map((test) => (
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

export default RecordPage