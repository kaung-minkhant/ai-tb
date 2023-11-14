import './CustomButton.style.css'

const CustomButton = ({label, fontSize="1rem", color="blue", textColor='white', handleClick=() => {}, disabled=false}) => {
  return (
    <>
      <div className='button-wrapper' style={{"--button-color": color, "--text-color": textColor, "--font-size": fontSize}}>
        <button className='button' onClick={ (e) => handleClick(e) } disabled={disabled}>{label}</button>
      </div>
    </>
  )
}

export default CustomButton
