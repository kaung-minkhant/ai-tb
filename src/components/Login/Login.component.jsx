import './Login.style.css'
import CustomInput from '../CustomInput/CustomInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { checkEmail, checkPassword, getUser, setUserAccessToken} from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../redux/Api/aiTbApi.slice'
import { setUser } from '../../redux/User/user.slice'
import { useDispatch } from 'react-redux'

const Login = ({styles: {loginWidth:width, fontSize}, setSignup}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, {data: user, isLoading, isSuccess}] = useLoginMutation()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [disable, setDisable] = useState(false)

  const isDisabled = disable || !Boolean(email) || !Boolean(password)

  useEffect(() => {
    if (user) {
      setUserAccessToken(user?.data.accessToken)
      const userObj = user.data.user 
      dispatch(setUser(userObj))
    }
  }, [isSuccess])

  const handleLogin = () => {
    login({email, password}) 
  }

  const handleSignUp = () => {
    setSignup(true)
  }

  if (isLoading) {
    return (
      <div>
        Logging in
      </div>
    )
  }

  return (
    <div className='login-wrapper'>
      <div className='login-inputs'>
        <div className='email-input'>
          <CustomInput saveValue={setEmail} setDisable={setDisable} width={width} fontSize={fontSize} type='text' icon={<EnvelopeIcon />} label={"Email Address"} validator={checkEmail} invalidMessage={"Invalid Email"}/>
        </div>
        <CustomInput saveValue={setPassword} setDisable={setDisable} width={width} fontSize={fontSize} type='password' icon={<LockClosedIcon />} label={"Password"} validator={checkPassword} invalidMessage={"Password must be at least 8 characters"}/>
      </div>
      <div className='login-buttons'>
        <CustomButton handleClick={handleLogin} disabled={isDisabled} label={'Login Now'} fontSize={fontSize} color={"blue"} textColor="white" />
        <CustomButton handleClick={handleSignUp} label={'Create Account'} fontSize={fontSize} color={"white"} textColor="black" />
      </div>
    </div>
  )
}

export default Login
