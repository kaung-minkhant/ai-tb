import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom"
import {MeetingService} from '../../services/meetingServices'
import { useEffect, useState } from "react"
import VideoComponent from "../../components/VideoCall/VideoComponent"
import './VideoCall.style.css'

const VideoCall = () => {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  // const [meetingId, setMeetingId] = useState(null)
  const [vDots, meetingId, setMeetingId] = useOutletContext()
  const [meetingService, setMeetingService] = useState(new MeetingService())
  useEffect(() => {
    meetingService.setMeetingIDUpdate(setMeetingId)
    meetingService.setNavigate(navigate)
  }, [])
  const callerId = params.get('callerId')
  const callerRole = params.get('callerRole')
  const recId = params.get('recId')
  const recRole = params.get('recRole')
  console.log({callerId, callerRole, recId, recRole})
  return (
    <div className="vdots">
      <h1>VDots</h1>
      <div>
        <VideoComponent meetingId={meetingId} setMeetingId={setMeetingId} meetingService={meetingService} 
          participantInfo={{
            callerId, callerRole, recId, recRole
          }}
        />
      </div>
    </div>
  )
}

export default VideoCall