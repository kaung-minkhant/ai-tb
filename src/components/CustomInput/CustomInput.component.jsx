import { useEffect, useState } from 'react';
import './CustomInput.style.css'
import { CheckCircleIcon, XCircleIcon} from '@heroicons/react/24/outline'

const CustomInput = ({saveValue = () => {}, setDisable=() => {}, icon, width="200px", fontSize="1rem", invalidMessage, label, validator=null, type='text'}) => {
  const [correct, setCorrect] = useState(null)
  const [value, setValue] = useState("")
  useEffect(() => {
    if (value.length) {
      setCorrect(null)
    }
  }, [value])

  useEffect(() => {
    if (correct) {
      saveValue(value)
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [correct])

  const handleChange = (e) => {
    setValue(e.target.value)
    saveValue(e.target.value)
  }
  const checkAfterChange = (valueToCheck) => {
    if (value.length === 0) {
      return
    }
    if (validator === null) {
      setCorrect(true)
    } else {
      setCorrect(validator(valueToCheck))
    }
  }

  return (
    <div className="input-wrapper" style={{"--input-width": width, "--input-font-size": fontSize}}>
      {
        icon !== null && (
          <div className='icon-container'>
            { icon }
          </div>
        )
      }
      <div className='input-container'>
        <input type={type} autoComplete={type === 'text' ? 'username' : 'current-password'} value={value} placeholder='' onChange={e => handleChange(e)}/>
        <label className='label'>{label}</label>
        {
          correct === null ? "" : correct ? "" : (
            <div className='error-card'>{invalidMessage}</div>
          )
        }
      </div>
      <div style={{width: "25px"}}>
        {
          correct ? (
            <CheckCircleIcon className='status' width={20} />
          ) : correct === null ? ("") : (
            <XCircleIcon className='status' width={20} />
          )
        }
      </div>
    </div>
  )
}

export default CustomInput
