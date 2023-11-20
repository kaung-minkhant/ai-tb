import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../utils'
import './Navbar.style.css'
import { useState } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/User/user.slice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [item, setItem] = useState(0)
  const isMobile = useMediaQuery("only screen and (max-width: 650px)")
  const [showSideBar, setShowSideBar] = useState(false)
  const activeList = []

  const patientNav = {
    Profile: '/patient/profile',
    DashBoard: '/patient',
    "View Scan History": '/patient/allscans',
    "View Test Records": '/patient',
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

  if (person === 'patient') {
    navItems = Object.keys(patientNav);
    navPaths = Object.values(patientNav);
  } else if (person === 'doctor') {
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
      <div className={`sidebar ${isMobile ? 'mobile' : ''} ${showSideBar ? 'show' : ''}`}>
        <div>
          <div className='navbar-profile'>
            <div className='profile'>
              <div className='profile-img'>
                <img style={{
                  width: '100%',
                  height: '100%',
                }} src='./images/patient_profile.png' /> 
              </div>
              <span className='profile-name'>A Chit Layy</span>
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

