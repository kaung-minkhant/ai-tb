import './PageOption.style.css'
const PageOption = ({children, label="", onClick=()=>{}}) => {
  return (
    <div className='page-option' onClick={onClick}>
      {children}
      {/* <ScanSVG width={iconWidth} />  */}
      <span className='page-option-label'>{label}</span>
    </div>
  )
}

export default PageOption
