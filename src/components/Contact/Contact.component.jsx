// import { useNavigate } from 'react-router-dom'
import './Contact.style.css'
import Log from "../Log/Log.component";
// import Popup from 'reactjs-popup'
import profileIcon from "../../assets/images/profile-line-icon.png"


const Contact = ({title, width='300px'}) => {
    return (
        <div className="contact" style={{"--min-width": width}}>
            <div className="title">
                <h1 className="title-txt">{title}</h1>
            </div>
            <div className="nav-buttons">
                <div className="btn-contact">Contacts</div>
                <div className="btn-contact">Call Log</div>
            </div>
            <div className="logs">
                <Log name="OK Na Sa" id="PID123s09" icon={profileIcon} time="10:10 am" timeColor="#FF5F5F "/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>
                <Log name="OK Na Sa" id="PID12309" icon={profileIcon}/>

            </div>
        </div>
    )
    


}

export default Contact