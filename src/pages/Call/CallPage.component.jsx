// import { useNavigate } from 'react-router-dom'
import './CallPage.style.css'
import {UserIcon} from '@heroicons/react/24/outline'
import { PiPhoneCallBold } from "react-icons/pi";
import { FaRegAddressBook } from "react-icons/fa";
import Log from '../../components/Log/Log.component'
import PageHeading from '../../components/HelperComponents/PageHeading.component'
import { useState } from 'react';
import Contacts from '../../components/ContactPageItems/Contacts.component';
import CallLogs from '../../components/ContactPageItems/CallLogs.component';
import { getUserRole } from '../../utils';


const CallPage = ({ width='300px'}) => {
  const [state, setState] = useState('contact') // contact || logs
  const handleContactClick = () => {
    setState('contact')
  }
  const handleLogsClick = () => {
    setState('logs')
  }
  return (
    <div className="call" style={{"--min-width": width}}>
      <PageHeading 
        heading={`Your ${state === 'contact' ? 'Contacts' : 'Call Logs'}`} 
        icon={state === 'contact' ? <FaRegAddressBook /> : <PiPhoneCallBold />} 
      />
      <div className="nav-buttons">
        <div onClick={handleContactClick} className={ `btn-contact ${state === 'contact' ? 'selected' : ''}` }>Contacts</div>
        <div onClick={handleLogsClick} className={ `btn-contact ${state === 'logs' ? 'selected': ''}` }>Call Log</div>
      </div>
      <div className='call-body'>
        {
          state === 'contact' && !(+getUserRole()===1) && (
            <Contacts />
          )
        }
        {
          state === 'logs' && !(+getUserRole()===1) && (
            <CallLogs />
          )
        }
      </div>
    </div>
  )
}

export default CallPage