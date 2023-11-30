import { useNavigate } from 'react-router'
import './TestRecords.style.css'
import { useGetRecordsQuery } from '../../redux/Api/aiTbApi.slice'
import { getUserId, getUserRole } from '../../utils'
import { useEffect, useState } from 'react'

const TestRecord = ({date, test}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '90%',
    }}>
      <span>{date}</span>
      <span>{test}</span>
    </div>
  )
}

const TestRecords = ({width='300px', patientId}) => {
  const {data: records, isLoading: isRecordsLoading, isSuccess: isRecordsSuccess} = useGetRecordsQuery({
    isDoctor: location.href.includes('doctor'),
    patientId: patientId
  })
  const [recordState, SetRecordState] = useState(null)
  console.log(records)
  const navigate = useNavigate()
  useEffect(() => {
    if (isRecordsSuccess) {
      if (+getUserRole() === 2) {
        SetRecordState(records.data.records.records)
      } else {
        SetRecordState(records.data.records)
      }
    }
  }, [isRecordsSuccess])

  
  const handleClick = (id) => {
    if (id) {
      navigate(`/doctor/patients/${id}/records`) 
    } else {
      navigate(`/patient/records`)
    }
  }

  
  return (
    <div className="test-records" style={{"--test-records-width": width}}>
      <div className='test-records-header'>
        Test Records
      </div>
      <div className='test-records-list'>
        {
          isRecordsLoading ? (<h3>Data Loading...</h3>) : (
            recordState?.map((record, index) => {
              return <TestRecord key={index} date={new Date(record.recordDate).toDateString()} test={record.type} />
            })
          )
        }
      </div>
      <div className='test-records-view-more' onClick={() => handleClick(patientId)}>
        View More Test Records
      </div>
    </div>
  )
}

export default TestRecords
