import { useNavigate } from 'react-router-dom'
import { deleteUser, deleteUserAccessToken, deleteUserRole, getWidth } from '../../utils'
import './Navbar.style.css'
import { useState } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUserName } from '../../redux/User/user.slice'

const Navbar = ({userRole}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector(selectUserName)
  const [item, setItem] = useState(0)
  const isMobile = useMediaQuery("only screen and (max-width: 650px)")
  const [showSideBar, setShowSideBar] = useState(false)
  const activeList = []

  const patientNav = {
    Profile: '/patient/profile',
    DashBoard: '/patient',
    Appointments: '/patient/appointments',
    'AI Scan': '/patient/ai-scan',
    'Test Records': '/patient/records',
    Calls: '/patient/calls',
    Analysis: '/analytic',
  }

  const doctorNav = {
    Profile: '/doctor/profile',
    DashBoard: '/doctor',
    Patients: '/doctor/patients',
    Appointments: '/doctor/appointments',
    Calls: '/doctor/calls',
    'AI Scan': '/doctor/ai-scan',
  }

  let navItems;
  let navPaths;

  const handleLogOut = () => {
    dispatch(logout())
    deleteUser()
    deleteUserAccessToken()
    deleteUserRole()
    navigate('/')
  }
  const handleOnClick = (index) => {
    setItem(index)
    navigate(navPaths[index])
    setShowSideBar(false)
  }
  const handleSideShow = () => {
    setShowSideBar(true)
  }
  const handleSideHide = () => {
    setShowSideBar(false)
  }

  let person; 

  if (window.location.href.match("#/patient")) {
    person = 'patient'
  } else if(window.location.href.match("#/doctor")) {
    person = 'doctor'
  }

  if (+userRole === 1) {
    navItems = Object.keys(patientNav);
    navPaths = Object.values(patientNav);
  } else if (+userRole === 2) {
    navItems = Object.keys(doctorNav)
    navPaths = Object.values(doctorNav)
  }

  navItems.forEach((navItem, index) => {
    let regex;
    if (navPaths[index] === '/') {
      regex = '/$'
    } else {
      regex = navPaths[index] + '$'
    }
    if (window.location.href.match(regex)) {
      activeList.push('active') 
    } else {
      activeList.push('')
    }
  })

  return (
    <>
      {
        isMobile && (
          <div className='navbar'>
            <Bars3Icon onClick={handleSideShow} className='navbar-icon' width={23} /> 
          </div>
        )
      }
      <div className={`sidebar ${isMobile ? 'mobile' : ''} ${showSideBar ? 'show' : ''}`} style={{
        "--sidebar-width": `${getWidth(130)}px`,
      }}>
        <div>
          <div className='navbar-profile'>
            <div className='profile'>
              <div className='profile-img'>
                <img style={{
                  width: '100%',
                  height: '100%',
                }} src='./images/patient_profile.png' /> 
              </div>
              <span className='profile-name'>{username}</span>
            </div>
            {
              isMobile && (
                <div className='sidebar-close'>
                  <XMarkIcon onClick={handleSideHide} width={20} />
                </div> 
              )
            }
          </div>
          <div className='navbar-items'>
            {
              navItems.map((item, index) => {
                return (
                  <div onClick={() => handleOnClick(index)} key={index} className={ `navbar-item ${activeList[index]}` }>{item}</div>
                )
              })
            }
          </div>
        </div>
        <button className='navbar-logout' onClick={handleLogOut}>Log Out</button> 
      </div>
    </>
  )
}

export default Navbar

