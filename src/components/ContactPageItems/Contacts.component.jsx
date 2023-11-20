import './Contacts.style.css'
import Log from '../Log/Log.component'
import {UserIcon} from '@heroicons/react/24/outline'

const Contacts = () => {
  return (
      <div className="contacts">
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />} />
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
        <Log name="OK Na Sa" id="PID12309" icon={<UserIcon width={20} />}/>
      </div>
  )
}

export default Contacts