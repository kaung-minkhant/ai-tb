import './Log.style.css'

const Log = ({name, id, icon, time, timeColor}) => {
    return (
      <div className="log">
        <div className="info">
          <div className="name">{name}</div>
          {
            id && (
              <div className="id">{id}</div>
            )
          }
        </div>
        <div className='date-icon'>
          {
            icon && (
              <div className='icon-container'>
                {icon}
              </div>
            )
          }
          {
            time && (
              <h1 className="time" style={{"color": timeColor}}>{ time }</h1>
            )
          }
        </div>
      </div>   
    )
}

export default Log
