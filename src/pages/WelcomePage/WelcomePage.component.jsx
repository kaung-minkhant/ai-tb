import './WelcomePage.style.css'
import Login from "../../components/Login/Login.component"
import { useEffect, useState } from 'react';
import { getWindowSize } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRoleId } from '../../redux/User/user.slice';
import Register from '../../components/Register/Register.component';

export const WelcomePageLoader = () => {
  return null
}

const WelcomePage = () => {
  const navigate = useNavigate()
  const [signup, setSignUp] = useState(false)
  const userId = useSelector(selectUserId)
  const userRoleId = useSelector(selectUserRoleId)
  const  windowWidth  = getWindowSize()
  const [styles, setStyles] = useState({
    loginWidth: `${ windowWidth /window.devicePixelRatio }px`,
    fontSize: '1rem'
  })

  const handleResize = () => {
    const windowWidth = getWindowSize()
    const newWidth = windowWidth / window.devicePixelRatio
    if (windowWidth <= 650) {
      setStyles({
        loginWidth: "90%",
        fontSize: "1.2rem"
      })
    } else {
      setStyles({
        loginWidth: `${newWidth/2}px`,
        fontSize: "1.5rem"
      })
    }
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize) 
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  useEffect(() => {
    if (userId && userRoleId === 1) {
      navigate('/patient') 
    }
  }, [userId, userRoleId])

  return (
    <div className="welcome-page" style={{display: 'flex'}}>
      <div className='welcome-image'>
        <img src="./images/welcome_image.png" /> 
      </div>
      <div className='login-logout'>
        {
          signup ? (
            <Register styles={styles} setSignUp={setSignUp}/>
          ) : (
            <Login styles={styles} setSignup={setSignUp}/>
          )
        }
      </div>
    </div>
  )
}

export default WelcomePage
