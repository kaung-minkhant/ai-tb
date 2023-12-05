import { useNavigate, useOutletContext, useSearchParams, useLocation } from "react-router-dom"
import {MeetingService} from '../../services/meetingServices'
import { useEffect, useRef, useState } from "react"
import VideoComponent from "../../components/VideoCall/VideoComponent"
import './VideoCall.style.css'
import Camera from '../../components/Tests/Video.js'
import axios from "axios"
import { useMediaQuery } from '@uidotdev/usehooks'
import { useCreateCallLogMutation } from "../../redux/Api/aiTbApi.slice.js"
import { getUserRole } from "../../utils.js"

const VideoCall = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [params, setParams] = useSearchParams()
  // const state = useLocation()
  const navigate = useNavigate()
  // const [meetingId, setMeetingId] = useState(null)
  const [vDots, meetingId, setMeetingId, ownPeer, target, call] = useOutletContext()
  const [createCallLog, {data: log, isSuccess, isLoading}] = useCreateCallLogMutation()
  // const [meetingService, setMeetingService] = useState(new MeetingService())
  const [targetPeerId, setTargetPeerId] = useState(null)
  const [conn, setConn] = useState(null)
  const [ownCamera, setOwnCamera] = useState(new Camera)
  const [otherCamera, setOtherCamera] = useState(new Camera)

  const ownVideoRef = useRef(null)
  const otherVideoRef = useRef(null)
  const ownVideoStream = useRef(null)
  const callRef = useRef(null)

  const callerId = params.get('callerId')
  const callerRole = params.get('callerRole')
  const recId = params.get('recId')
  const recRole = params.get('recRole')
  const inCall = params.get('incall')
  console.log(recId, recRole)
  console.log('call', call)

  useEffect(() => {
    // if (!inCall) {
      if (isMobile) {
        ownCamera.startCamera(200, 200, 'video-list', 'caller-video', call, false, true)
      } else {
        ownCamera.startCamera(300, 240, 'video-list', 'caller-video', call, false)
      }
    // }
    
    async function getPeerId(userId, userRole, targetId, targetRole) {
      const response = await axios.post(import.meta.env.VITE_MEETING_ENDPOINT, {
        USERID: userId,
        USERROLE: userRole,
        TARGETID: targetId,
        TARGETROLE: targetRole
      })
      console.log(response.data)
      setTargetPeerId(response.data.peerId)
    }
    if (!inCall) {
      getPeerId(callerId, callerRole, recId, recRole) 
    } else {
      // call.answer(ownCamera.getStream())
      call.on('stream', (stream) => {
        otherCamera.setStream(stream)
        if (isMobile) {
          otherCamera.startCamera(200, 200, 'video-list', 'other-video', null, false, true)
        } else {
          otherCamera.startCamera(300, 240, 'video-list', 'other-video', null, false)
        }
      })
    }
    
  }, [])

  useEffect(() => {
    if (targetPeerId) {
      const connn = ownPeer.connect(targetPeerId)
      connn.on('open',  () => {
        connn.send(JSON.stringify({
          targetId: recId,
          targetRole: recRole,
          inCall: inCall
        }));
    });
      setConn(connn)
    }
  }, [targetPeerId])

  console.log({callerId, callerRole, recId, recRole})

  let renderVideo = (element, stream) => {
    element.srcObject = stream;
  };

  const handleStart = async () => {
    console.log('calling')
    const role = +getUserRole()
    createCallLog({doctorId: role === 2 ? callerId : recId, patientId: role === 2 ? recId : callerId}) 
    await new Promise(resolve => {
      setTimeout(() => resolve(), 1000)
    })
    callRef.current = ownPeer.call(targetPeerId, ownCamera.getStream())
    callRef.current.on('stream', (stream) => {
      console.log('answered')
      otherCamera.setStream(stream);
      if (isMobile) {
        otherCamera.startCamera(300, 200, 'video-list', 'other-video', false, true)
      } else {
        otherCamera.startCamera(300, 240, 'video-list', 'other-video', false)
      }
    })
    // callRef.current.on('close', () => {
    //   stopCall()
    // })
  }

  const stopCall = () => {
    console.log('stoping')
    if (callRef.current) {
      callRef.current.close()
    }
    if (call) {
      call.close()
    }
    navigate(-1)
  }
  return (
    <div className="vdots">
      <h1>VDots</h1>
      <div className="vdots-btns">
        {
          !inCall && (
            <button onClick={handleStart}>Start the call</button>
          )
        }

        <button onClick={stopCall}>Stop Call</button>
      </div>
      <div>
        <div id="video-list">
          {/* <video></video>
          <video></video> */}
        </div>
      </div>
    </div>
  )
}

export default VideoCall