import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { selectUserId, selectUserRoleId, setUser } from "../redux/User/user.slice"
import { useEffect, useState } from "react"
import { getUserId, getUserRole } from "../utils"
import { vDotService } from "../services/vDotService"
import {useGetDoctorMutation, useGetProfileMutation} from '../redux/Api/aiTbApi.slice.js'
import "../services/peer.min.js"

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
  const [vDots, setVDots] = useState(new vDotService())
  const [meetingId, setMeetingId] = useState(null)
  const [target, setTarget] = useState({})
  const [ownPeer, setOwnPeer] = useState(new Peer(undefined,{
    host: '52.221.188.235',
    port: 8082,
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
      vDots.openSocket(setMeetingId, setTarget, id)
    });
    ownPeer.on('error', (error) => {
      console.log('My peer error is: ' + error)
    });
    ownPeer.on('connection', (conn) => {
      console.log('incoming peer connection!');
      conn.on('data', (data) => {
        setTarget(JSON.parse(data))
        console.log(`received: ${data}`);
      });
      conn.on('open', () => {
        conn.send('hello!');
      });
    });
    ownPeer.on('call', (call) => {
      if (!target.inCall) {
        navigate(`/patient/call?callerId=${getUserId()}&callerRole=${getUserRole()}&recId=${target.targetId}&recRole=${target.targetRole}&incall=true`)
      }
      console.log('being called')
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
          if (confirm('accept?')) {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', (stream) => {
              const receiver = document.getElementById('receiver-video')
              receiver.style.display = 'block';
              receiver.srcObject = stream
            });
            call.on('close', () => {
              navigate(-1)
            })
          }
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });
  }, [])
  useEffect(() => {
    if (isSuccess && isDoctorSuccess) {
      dispatch(setUser({
        ...user.data.user,
        doctorName: doctor.data.doctors.doctorName,
        doctorId: doctor.data.doctors.doctorId
      }))
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
        <Outlet context={[vDots, meetingId, setMeetingId, ownPeer, target]}/>
      </div>
    </div>
  )
}

export default MainLayout
