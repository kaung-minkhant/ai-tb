import './InfoBox.style.css'

const InfoBox = ({label, text}) => {
  return (
    <div className='info-box'>
      <div className='info-box-label'>{label}</div>
      <div className='info-box-text'>{text}</div>
    </div>
  )
}

export default InfoBox
