import './AiScan.style.css'
import Camera from '../Tests/Video'
import { useEffect, useState } from 'react'
import PageHeading from '../HelperComponents/PageHeading.component'
import { ScanSVG } from '../SVG/SVG.component'
import {CameraIcon, ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import { useUploadXrayMutation } from '../../redux/Api/aiTbApi.slice'
import { useMediaQuery } from '@uidotdev/usehooks'

const AiScan = () => {
  const [camera, _] = useState(new Camera)
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [uploadXray, {data, isSuccess, isLoading}] = useUploadXrayMutation()
  useEffect(() => {
    if (isMobile) {
      camera.startCamera(300, 400, 'video-element', true)
    } else {
      camera.startCamera(300, 240, 'video-element')
    }
  }, [])
  const handleSave = () => {
    const dataUrl = camera.takeSnapshot()
    uploadXray({dataURL: dataUrl})
  }
  return (
    <div className='ai-scan'>
      <PageHeading heading={'AI Scan'} icon={<ScanSVG width='20px' />} />
      <div className='ai-scan-box'>
        <div className='ai-scan-bounding'></div>
        <div id='video-element'></div>
      </div>
      <div className='scan-warning-text'>Please ensure your CXR image is inside the Green Boundary</div>
      <div className='take-scan' onClick={handleSave}>
        <CameraIcon width={40} />
      </div>
      <div className='scan-upload'>
        <ArrowUpTrayIcon width={25} /> Upload from Device Storage
      </div>
    </div>
  )
}

export default AiScan