import { useSelector } from "react-redux"
import Navbar from "../components/Navbar/Navbar.component"
import "./MainLayout.style.css"
import { Outlet, useNavigate } from "react-router-dom"
import { selectUserId } from "../redux/User/user.slice"
import { useEffect } from "react"
import { deleteUserAccessToken } from "../utils"

export const MainLayoutLoader = () => {
  return null
}

const MainLayout = () => {
  const userId = useSelector(selectUserId)
  const navigate = useNavigate()

  useEffect(() => {
    // if (!userId) {
    //   deleteUserAccessToken()
    //   navigate('/') 
    // }
  }, [userId])
  return (
    <div className="main-layout">
      <Navbar/>
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
