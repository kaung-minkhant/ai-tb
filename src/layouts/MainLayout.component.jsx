import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { selectUserId, selectUserRoleId, setUser } from "../redux/User/user.slice"
import { useEffect, useState } from "react"
import { getUserId, getUserRole } from "../utils"
import { vDotService } from "../services/vDotService"
import {useGetProfileMutation} from '../redux/Api/aiTbApi.slice.js'

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
  const dispatch = useDispatch()
  const [vDots, setVDots] = useState(new vDotService())
  const [meetingId, setMeetingId] = useState(null)
  const [target, setTarget] = useState({})
  const {userId, userRole} = useLoaderData()
  const navigate = useNavigate()
  console.log('user', user?.data.user)
  useEffect(() => {
    if (!storeUserId && userId) {
      getProfile(userRole)
    }
  }, [])
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(user.data.user))
    }
  }, [isSuccess])
  useEffect(() => {
    if (!userId) {
      navigate('/') 
    }
  }, [userId])

  useEffect(() => {
    if (meetingId) {
      if (+userRole === 1) {
        navigate(`/patient/call?callerId=${getUserId()}&callerRole=${getUserRole()}&recId=${target.targetId}&recRole=${target.targetRole}`)
      }
    }
  }, [meetingId])

  useEffect(() => {
    vDots.setUser({id: userId, role: userRole})
    vDots.openSocket(setMeetingId, setTarget)
  }, [])

  return (
    <div className="main-layout">
      <Navbar/>
      <div className="main-content">
        <Outlet context={[vDots, meetingId, setMeetingId]}/>
      </div>
    </div>
  )
}

export default MainLayout
