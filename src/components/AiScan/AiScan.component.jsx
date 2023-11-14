import { useNavigate } from 'react-router-dom'
import './AiScan.style.css'
import Popup from 'reactjs-popup'

const AiScan = ({width='300px'}) => {
  const navigate = useNavigate()
  const handleViewAllScans = () => {
    navigate('/patient/allscans')
  }
  return (
    <div className='ai-scan' style={{"--ai-scan-width": width}}>
      <div className='ai-scan-image'>
        <img style={{
          width: '100%',
        }} src='./images/chest_x_ray.png' />
      </div>
      <div className='ai-scan-btns'>
        <Popup trigger={<button className='btn ai-scan-btn'>AI Scan</button>} modal>
          <div style={{
            border: "1.5px solid black",
            borderRadius: '1rem',
            padding: '2rem',
            backgroundColor: 'white',
          }}>
            <h2 style={{
              padding: 0,
              margin: 0,
              marginBottom: '2rem',
            }}>Choose and Upload the scanned image</h2>
            <form>
              <input type='file' />
              <button>Upload Scan</button>
            </form>
          </div>
        </Popup>
        <button className='btn ai-scan-btn' onClick={handleViewAllScans}>View Scan History</button>
      </div>
    </div>
  )
}

export default AiScan
