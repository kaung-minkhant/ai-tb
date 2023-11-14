import './Register.style.css'
import CustomInput from '../CustomInput/CustomInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { checkEmail, checkPassword, checkMatchPassword} from '../../utils'
import { useEffect, useState } from 'react'
import { useSignupMutation } from '../../redux/Api/aiTbApi.slice'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/User/user.slice'

const Register = ({styles: {loginWidth:width, fontSize}, setSignUp}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [disable, setDisable] = useState([false, false, false])
  const [signup, {data: user, isLoading, isSuccess}] = useSignupMutation()
  const checkPasswordMatch = checkMatchPassword(password)

  const isDisabled = disable || !Boolean(email) || !Boolean(password) || !Boolean(confirmPassword)

  const handleSignup = () => {
    signup({email, password}) 
  }

  useEffect(() => {
    if (user) {
      const userObj = user.data.user
      dispatch(setUser(userObj))
    } 
  }, [isSuccess])

  return (
    <div className='register-wrapper'>
      <div className='register-inputs'>
        <CustomInput saveValue={setEmail} setDisable={setDisable} type='text' width={width} fontSize={fontSize} icon={<EnvelopeIcon />} label={"Email Address"} validator={checkEmail} invalidMessage={"Invalid Email"}/>
        <CustomInput saveValue={setPassword} setDisable={setDisable} type='password' width={width} fontSize={fontSize} icon={<LockClosedIcon />} label={"Password"} validator={checkPassword} invalidMessage={"Password must be at least 8 characters"}/>
        <CustomInput saveValue={setConfirmPassword} setDisable={setDisable} type='password' width={width} fontSize={fontSize} icon={<LockClosedIcon />} label={"Repeat Password"} validator={checkPasswordMatch} invalidMessage={"Passwords do not match"}/>
      </div>
      <div className='register-buttons'>
        <CustomButton handleClick={handleSignup} label={'Sign up now'} fontSize={fontSize} color={"blue"} textColor="white" disabled={isDisabled}/>
        <span>Already have an account? <span onClick={() => setSignUp(false)} style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}>Log in</span></span>
      </div>
    </div>
  )
}

export default Register
