import { useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { selectUserId, selectUserRoleId } from "../redux/User/user.slice"
import { useEffect, useState } from "react"
import { getUserId, getUserRole } from "../utils"
import { vDotService } from "../services/vDotService"

export const MainLayoutLoader = () => {
  const user = getUserId()
  const userRole = getUserRole()
  return {
    user, userRole
  }
}

const MainLayout = () => {
  const userId = useSelector(selectUserId)
  const [vDots, setVDots] = useState(new vDotService())
  const [meetingId, setMeetingId] = useState(null)
  const [target, setTarget] = useState({})
  const {user, userRole} = useLoaderData()
  const navigate = useNavigate()
  console.log(meetingId)
  console.log(target)

  useEffect(() => {
    if (!user) {
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
    vDots.setUser({id: user, role: userRole})
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
