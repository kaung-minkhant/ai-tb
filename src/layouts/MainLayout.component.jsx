import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { selectUserId, selectUserRoleId, setUser } from "../redux/User/user.slice"
import { useEffect, useState, useRef, useLayoutEffect } from "react"
import { getStorageValue, getUserId, getUserRole } from "../utils"
import { vDotService } from "../services/vDotService"
import {useGetDoctorMutation, useGetProfileMutation} from '../redux/Api/aiTbApi.slice.js'
import "../services/peer.min.js"
import Camera from '../components/Tests/Video.js'
import { useMediaQuery } from '@uidotdev/usehooks'

export const MainLayoutLoader = () => {
  const userId = getUserId()
  const userRole = getUserRole()
  const userFirstName = getStorageValue('firstName')
  return {
    userId, userRole, userFirstName
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
    host: 'd4hroxt5b51e.cloudfront.net',
    debug: 3,
    secure: true,
    path: '/peerjs/myapp',
    // config: {
    //   'iceServers': [
    //     {
    //       url: 'turn:d1itmmsc3m4ml8.cloudfront.net',
    //       credential: 'credentials',
    //       username: 'password'
    //     }
    //   ]
    // }
  }))
  const {userId, userRole, userFirstName} = useLoaderData()
  const navigate = useNavigate()

  console.log('userfirstname', userFirstName)
  useLayoutEffect(() => {
    if (userFirstName === 'null' && userId) {
      navigate('onboarding')
    }
  }, [])

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

  useEffect(() => {
    if (!userId) {
      navigate('/') 
    }
  }, [userId])


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
