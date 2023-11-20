import './PageHeading.style.css'

const PageHeading = ({heading, icon}) => {
  return (
    <div className='page-heading-title'>
      <span>{heading}</span>
      {icon}
    </div>
  )
}

export default PageHeading