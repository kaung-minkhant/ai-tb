import './Register.style.css'
import CustomInput from '../CustomInput/CustomInput.component'
import CustomButton from '../CustomButton/CustomButton.component'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { checkEmail, checkPassword, checkMatchPassword} from '../../utils'
import { useEffect, useState } from 'react'
import { useSignupMutation } from '../../redux/Api/aiTbApi.slice'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [styles] = useOutletContext()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [disable, setDisable] = useState([false, false, false])
  const [signup, {data: user, isLoading, isSuccess}] = useSignupMutation()
  const checkPasswordMatch = checkMatchPassword(password)

  const {loginWidth: width, fontSize} = styles

  const isDisabled = !Boolean(email) || !Boolean(password) || !Boolean(confirmPassword)

  const handleSignup = () => {
    if (!checkEmail(email)) {
      toast.error("Invalid Email", {
        duration: 2000
      })
    }
    if (!checkPassword(password)) {
      toast.error("Password needs to have at least 8 characters", {
        duration: 2000
      })
    }
    if (!checkPasswordMatch(confirmPassword)) {
      toast.error("Passwords do not match", {
        duration: 2000
      })
    }
    if (checkEmail(email) && checkPassword(password) && checkPasswordMatch(confirmPassword)) {
      signup({email, password}) 
    }
  }

  useEffect(() => {
    if (user) {
      const userObj = user.data.user
      navigate('/')
      // navigate('/onboarding', {state: {
      //   id: userObj.userId,
      //   state: 'signup'
      // }})
    } 
  }, [isSuccess])

  return (
    <div className='register-wrapper'>
      <div className='register-inputs'>
        <CustomInput autoComplete={false} saveValue={setEmail} setDisable={setDisable} type='text' width={width} fontSize={fontSize} icon={<EnvelopeIcon />} label={"Email Address"} validator={checkEmail} invalidMessage={"Invalid Email"}/>
        <CustomInput autoComplete={false} saveValue={setPassword} setDisable={setDisable} type='password' width={width} fontSize={fontSize} icon={<LockClosedIcon />} label={"Password"} validator={checkPassword} invalidMessage={"Password must be at least 8 characters"}/>
        <CustomInput autoComplete={false} saveValue={setConfirmPassword} setDisable={setDisable} type='password' width={width} fontSize={fontSize} icon={<LockClosedIcon />} label={"Repeat Password"} validator={checkPasswordMatch} invalidMessage={"Passwords do not match"}/>
      </div>
      <div className='register-buttons'>
        <CustomButton handleClick={handleSignup} label={'Sign up now'} fontSize={fontSize} color={"blue"} textColor="white" disabled={isDisabled}/>
        <span>Already have an account? <span onClick={() => navigate('/')} style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}>Log in</span></span>
      </div>
    </div>
  )
}

export default Register
