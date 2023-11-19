import './PageOption.style.css'
const PageOption = ({children, label=""}) => {
  return (
    <div className='page-option'>
      {children}
      {/* <ScanSVG width={iconWidth} />  */}
      <span className='page-option-label'>{label}</span>
    </div>
  )
}

export default PageOption
