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
  const navItems = ['DashBoard', 'View Scan History', 'View Test Records', 'Analysis']
  const activeList = []
  const navPaths = ["/patient", "/patient/allscans", "/patient", '/analytic']

  const handleLogOut = () => {
    dispatch(logout())
    // deleteUser()
    // navigate('/') 
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

