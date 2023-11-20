import './AiScan.style.css'
import Camera from '../Tests/Video'
import { useEffect, useState } from 'react'
import PageHeading from '../HelperComponents/PageHeading.component'
import { ScanSVG } from '../SVG/SVG.component'

const AiScan = () => {
  const [camera, _] = useState(new Camera)
  useEffect(() => {
    camera.startCamera(300, 240, 'video-element')
  }, [])
  return (
    <div className='ai-scan'>
      <PageHeading heading={'AI Scan'} icon={<ScanSVG width='20px' />} />
      <div className='ai-scan-box'>
        <div className='ai-scan-bounding'></div>
        <div id='video-element'></div>
      </div>
    </div>
  )
}

export default AiScan