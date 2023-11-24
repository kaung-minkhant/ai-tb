import { getWidth } from '../../utils'
import './PageOption.style.css'
const PageOption = ({children, label="", onClick=()=>{}, width=150}) => {
  return (
    <div className='page-option' onClick={onClick} style={{"--width": `${getWidth(width)}px`}}>
      {children}
      {/* <ScanSVG width={iconWidth} />  */}
      <span className='page-option-label'>{label}</span>
    </div>
  )
}

export default PageOption
