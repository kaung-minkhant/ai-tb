import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom"
import {MeetingService} from '../../services/meetingServices'
import { useEffect, useRef, useState } from "react"
import VideoComponent from "../../components/VideoCall/VideoComponent"
import './VideoCall.style.css'
import Camera from '../../components/Tests/Video.js'
import axios from "axios"
import { useMediaQuery } from '@uidotdev/usehooks'

const VideoCall = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  // const [meetingId, setMeetingId] = useState(null)
  const [vDots, meetingId, setMeetingId, ownPeer, target] = useOutletContext()
  // const [meetingService, setMeetingService] = useState(new MeetingService())
  const [targetPeerId, setTargetPeerId] = useState(null)
  const [camera, _] = useState(new Camera)

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

  useEffect(() => {
    if (isMobile) {
      camera.startCamera(300, 400, 'video-list', true)
    } else {
      camera.startCamera(300, 240, 'video-list')
    }
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
    getPeerId(callerId, callerRole, recId, recRole) 
    // conn.on('data', (data) => {
    //   console.log(`received: ${data}`);
    // });
    /*global navigator*/
    /*global MediaStream*/
    // navigator.mediaDevices.getUserMedia({video: true})
    //   .then((stream) => {
        // ownVideoStream.current = stream
        // const videoTrack = stream.getVideoTracks()[0];
        // const videoStream = new MediaStream()
        // videoStream.addTrack(videoTrack)
        // const video = document.getElementById('caller-video')
        // video.srcObject = stream
        // renderVideo(video, stream)
      // })
  }, [])
  console.log({callerId, callerRole, recId, recRole})

  let renderVideo = (element, stream) => {
    element.srcObject = stream;
  };

  const handleStart = async () => {
    const conn = ownPeer.connect(targetPeerId)
    conn.on('data', (data) => {
      console.log(`received: ${data}`);
    });
    conn.on('open',  () => {
      conn.send(JSON.stringify({
        targetId: recId,
        targetRole: recRole,
        inCall: inCall
      }));
    });
    await new Promise(resolve => {
      setTimeout(() => resolve(), 1000)
    })
    callRef.current = ownPeer.call(targetPeerId, ownVideoStream.current)
    callRef.current.on('stream', (stream) => {
      otherVideoRef.current.style.display = 'block'
      otherVideoRef.current.srcObject = stream
    })
    callRef.current.on('close', () => {
      stopCall()
    })
  }

  const stopCall = () => {
    document.getElementById('receiver-video').srcObject = null
    document.getElementById('caller-video').srcObject = null
    if (callRef.current) {
      callRef.current.close()
    }
    navigate(-1)
  }
  return (
    <div className="vdots">
      <h1>VDots</h1>
      <div>
        {
          !inCall && (
            <button onClick={handleStart}>Start the call</button>
          )
        }

        <button onClick={stopCall}>Stop Call</button>
        {/* <VideoComponent meetingId={meetingId} setMeetingId={setMeetingId} meetingService={meetingService} 
          participantInfo={{
            callerId, callerRole, recId, recRole
          }}
        /> */}
      </div>
      <div>
        <div id="video-list">
          {/* <video width={"300px"} id="caller-video" ref={ownVideoRef} autoPlay/>
          <video width={"300px"} id="receiver-video" ref={otherVideoRef} autoPlay /> */}
        </div>
      </div>
    </div>
  )
}

export default VideoCall