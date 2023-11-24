import './CallLogs.style.css'
import Log from '../Log/Log.component'
import {UserIcon, PhoneArrowDownLeftIcon, PhoneArrowUpRightIcon, PhoneXMarkIcon} from '@heroicons/react/24/outline'
import { useGetCallLogsQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserAccessToken } from '../../utils'

const CallLog = ({date, logs}) => {
  const [renders, setRenders] = useState([])
  console.log(logs)
  useEffect(() => {
    const renderLogs = []
    getPatients(logs).then(details => {
      details.forEach((detail, index) => {
        renderLogs.push(
          <Log key={logs[index].callLogId} name={detail.data.firstName} id={detail.data.phone} icon={<UserIcon width={25}/>} />
        )
      })
      setRenders(renderLogs)
    })
  }, [])
  const getPatients = async (patients) => {
    const patientDetails = []
    for (const patient of patients) {
      const response = await axios.get(import.meta.env.VITE_URL + '/users/' + patient.patientId, {
        headers: {
          authorization: `Bearer ${getUserAccessToken()}`
        }
      })
      patientDetails.push(response.data)
    }
    return patientDetails
  }
  return (
    <div className='log-date'>
      <span className='date'>{date}{new Date(date).toDateString() === new Date().toDateString() && " (Today)"}</span>
      <div className="call-log">
        {
          renders
        }
        {/* <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'9:00 AM'} />
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'10:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowUpRightIcon width={20} />} time={'11:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'12:00 PM'}/> */}
        {/* <Log name="OK Na Sa" id="PID12309" icon={<PhoneXMarkIcon width={20} />} time={'3:00 PM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowUpRightIcon width={20} />} time={'9:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'9:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneXMarkIcon width={20} />} time={'9:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneXMarkIcon width={20} />} time={'9:00 AM'}/> */}
      </div>
    </div>
  )
}

const CallLogs = () => {
  const {data: logs, isLoading, isSuccess} = useGetCallLogsQuery()
  const [renders, setRenders] = useState([])
  useEffect(() => {
    let renderLogs;
    if (isSuccess) {
      const groupedLogs = groupLogs(logs.data.logs)
      renderLogs = Object.keys(groupedLogs).map(groupLog => {
        return <CallLog key={groupLog} date={groupLog} logs={groupedLogs[groupLog]}/>
      })
      setRenders(renderLogs)


    }
  }, [isSuccess])
  if (isLoading) {
    return (
      <div>Call Logs are loading</div>
    )
  }
  function groupLogs (logs) {
    let sortedLogs = [...logs]
    sortedLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const groupedLogs = {}
    sortedLogs?.forEach(log => {
      const date = new Date(log.createdAt).toDateString()
      if (Object.keys(groupedLogs).includes(date)) {
        groupedLogs[date].push(log)
      } else {
        groupedLogs[date] = []
        groupedLogs[date].push(log)
      }
    }) 
    return groupedLogs
  }
  return (
    <div className='logs'>
      {
        renders
      }
      {/* <CallLog date={'19-Nov-2023'} />
      <CallLog date={'18-Nov-2023'} /> */}
    </div>
  )
}

export default CallLogs