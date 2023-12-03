import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { selectUserId, selectUserRoleId, setUser } from "../redux/User/user.slice"
import { useEffect, useState, useRef } from "react"
import { getUserId, getUserRole } from "../utils"
import { vDotService } from "../services/vDotService"
import {useGetDoctorMutation, useGetProfileMutation} from '../redux/Api/aiTbApi.slice.js'
import "../services/peer.min.js"
import Camera from '../components/Tests/Video.js'
import { useMediaQuery } from '@uidotdev/usehooks'

export const MainLayoutLoader = () => {
  const userId = getUserId()
  const userRole = getUserRole()
  return {
    userId, userRole
  }
}

const MainLayout = () => {
  const storeUserId = useSelector(selectUserId)
  const [getProfile, {data: user, isLoading, isSuccess}] = useGetProfileMutation()
  const [getDoctor, {data: doctor, isLoading: isDoctorLoading, isSuccess: isDoctorSuccess}] = useGetDoctorMutation()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [vDots, setVDots] = useState(new vDotService())
  const [meetingId, setMeetingId] = useState(null)
  const [target, setTarget] = useState({})
  const targetRef = useRef(null)
  const [ownCamera, setOwnCamera] = useState(new Camera())
  const [call, setCall] = useState(null)
  const [ownPeer, setOwnPeer] = useState(new Peer(undefined,{
    host: 'd3han8ue9ryj52.cloudfront.net',
    // port: 8082,
    secure: true,
    path: '/peerjs/myapp',
  }))
  const {userId, userRole} = useLoaderData()
  const navigate = useNavigate()
  // console.log('user', user?.data.user)
  useEffect(() => {
    if (!storeUserId && userId) {
      getProfile(userRole)
      if (+userRole === 1) {
        getDoctor()
      }
    }
    vDots.setUser({id: userId, role: userRole})
    ownPeer.on('open', (id) => {
      console.log('My peer ID is: ' + id)
      // alert(`hiii my id is ${id}`)
      vDots.openSocket(setMeetingId, setTarget, id)
    });
    ownPeer.on('error', (error) => {
      console.log('My peer error is: ' + error)
    });
    ownPeer.on('connection', (conn) => {
      console.log('incoming peer connection!');
      conn.on('data', (data) => {
        setTarget(JSON.parse(data))
        targetRef.current = JSON.parse(data)
        console.log(`received: ${data}`);
      });
      conn.on('open', () => {
        conn.send('hello!');
      });
    });
    ownPeer.on('call', (call) => {
      setCall(call)
      console.log('target',targetRef.current)
      
      if (!target.inCall) {
        navigate(`/patient/call?callerId=${getUserId()}&callerRole=${getUserRole()}&recId=${targetRef.current.targetId}&recRole=${targetRef.current.targetRole}&incall=true`)
      }
      console.log('being called')
      // navigator.mediaDevices.getUserMedia({video: true, audio: true})
      //   .then(stream => {
      //       call.answer(stream)
      //   })
      // if (isMobile) {
      //   ownCamera.startCamera(400, 400, 'video-list', 'own-video', false, true)
      // } else {
      //   ownCamera.startCamera(300, 240, 'video-list', 'own-video', false)
      // }
      // i am here
      // call.answer(otherCamera.getStream())
      // call.on('stream', (stream) => {
      //   if (isMobile) {
      //     otherCamera.startCamera(400, 400, 'video-list', 'other-video', false, true)
      //   } else {
      //     otherCamera.startCamera(300, 240, 'video-list', 'other-video', false)
      // }
      // })
      // navigator.mediaDevices.getUserMedia({video: true, audio: true})
      //   .then((stream) => {
      //     // if (confirm('accept?')) {
      //       call.answer(stream); // Answer the call with an A/V stream.
      //       call.on('stream', (stream) => {
      //         const receiver = document.getElementById('receiver-video')
      //         receiver.style.display = 'block';
      //         receiver.srcObject = stream
      //       });
      //       call.on('close', () => {
      //         navigate(-1)
      // //       })
      //     }
      //   })
      //   .catch((err) => {
      //     console.error('Failed to get local stream', err);
      //   });
    });
  }, [])
  useEffect(() => {
    if (isSuccess) {
      if (+userRole === 1) {
        if (isDoctorSuccess) {
          dispatch(setUser({
            ...user.data.user,
            doctorName: doctor.data.doctors.doctorName,
            doctorId: doctor.data.doctors.doctorId
          }))
        }
      } else {
        dispatch(setUser({
          ...user.data.user,
        }))
      }
    }
  }, [isSuccess, isDoctorSuccess])
  // useEffect(() => {
  //   if (isDoctorSuccess) {
  //     console.log('doctor', doctor.data.doctors)
  //   }
  // }, [isDoctorSuccess])
  useEffect(() => {
    if (!userId) {
      navigate('/') 
    }
  }, [userId])

  // useEffect(() => {
  //   if (meetingId) {
  //     if (+userRole === 1) {
  //       navigate(`/patient/call?callerId=${getUserId()}&callerRole=${getUserRole()}&recId=${target.targetId}&recRole=${target.targetRole}`)
  //     }
  //   }
  // }, [meetingId])

  // useEffect(() => {
  // }, [])

  return (
    <div className="main-layout">
      <Navbar userRole={userRole}/>
      <div className="main-content">
        <Outlet context={[vDots, meetingId, setMeetingId, ownPeer, target, call]}/>
      </div>
    </div>
  )
}

export default MainLayout
