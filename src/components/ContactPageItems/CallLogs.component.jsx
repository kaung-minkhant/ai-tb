import './CallLogs.style.css'
import Log from '../Log/Log.component'
import {UserIcon, PhoneArrowDownLeftIcon, PhoneArrowUpRightIcon, PhoneXMarkIcon} from '@heroicons/react/24/outline'

const CallLog = ({date}) => {
  return (
    <div className='log-date'>
      <span className='date'>{date}{new Date(date).toDateString() === new Date().toDateString() && " (Today)"}</span>
      <div className="call-log">
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'9:00 AM'} />
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'10:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowUpRightIcon width={20} />} time={'11:00 AM'}/>
        <Log name="OK Na Sa" id="PID12309" icon={<PhoneArrowDownLeftIcon width={20} />} time={'12:00 PM'}/>
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
  return (
    <div className='logs'>
      <CallLog date={'19-Nov-2023'} />
      <CallLog date={'18-Nov-2023'} />
    </div>
  )
}

export default CallLogs