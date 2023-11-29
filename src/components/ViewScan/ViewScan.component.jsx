import { useLocation } from 'react-router-dom'
import './ViewScan.style.css'
import { useState } from 'react'
const ViewScan = () => {
  const {state: scanData} = useLocation()
  const [view, setView] = useState('original') // original || heatmap
  let imgSrc;
  if (view === 'original') {
    imgSrc = scanData.original
  } else if (view === 'heatmap') {
    imgSrc = scanData.output
  }

  function handleViewChange(view) {
    setView(view) 
  }
  console.log(scanData)
  return (
    <div className="view-scan">
      <div className='scan-image-view'>
        <div className='scan-image-container'>
          <img className={`scan-image ${view==='original' ? 'original' : ''}`} src={imgSrc} alt={`${view} scan image`}/>
        </div>
        <div className='view-buttons'>
          <button className={`btn view-button ${view==='original' ? 'selected' : ''}`} onClick={() => handleViewChange('original')}>Original</button>
          <button className={`btn view-button ${view==='heatmap' ? 'selected' : ''}`} onClick={() => handleViewChange('heatmap')}>Heatmap</button>
        </div>
        <div className='prediction-view'>
          <h2 className='prediction-title'>AI Prediction Result</h2>
          <p className='prediction-result'>{scanData.results}</p>
        
          <p className='prediction-result'>Positive Score: {scanData.score}</p>
        </div>
      </div>
      {/* <img className='scan-image original' src={scanData.original} alt='original scan' />
      <div className='result-images'>
        <img className='scan-image' src={scanData.output} alt='output scan' />
        <img className='scan-image' src={scanData.roi} alt='roi scan' />
      </div> */}
    </div>
  )
}

export default ViewScan
