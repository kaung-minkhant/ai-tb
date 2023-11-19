import './Log.style.css'



const Log = ({name, id, icon, time, timeColor}) => {
    return (
        <div className="log">
            <div className="info">
                <div className="name">{name}</div>
                <div className="id">{id}</div>
            </div>
            <div className="icon-container">
                
                {
                    time?
                    <h1 className="time" style={{"color": timeColor}}>10:10 am</h1>
                    : <img src={icon} alt="" className="icon" />
                }
                
            </div>
        </div>   
    )
}

export default Log