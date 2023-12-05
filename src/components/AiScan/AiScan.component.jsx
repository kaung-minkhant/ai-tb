import './AiScan.style.css'
import Camera from '../Tests/Video'
import { useEffect, useState } from 'react'
import PageHeading from '../HelperComponents/PageHeading.component'
import { ScanSVG } from '../SVG/SVG.component'
import {CameraIcon, ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import { useUploadXrayMutation } from '../../redux/Api/aiApi.slice'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom'
import { getUserRole } from '../../utils'

const AiScan = () => {
  const [camera, _] = useState(new Camera)
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const [uploadXray, {data:scanData, isSuccess, isLoading}] = useUploadXrayMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (isMobile) {
      camera.startCamera(300, 400, 'video-element', 'ai-scan-camera', null, true, true)
    } else {
      camera.startCamera(300, 240, 'video-element', 'ai-scan-camera', null, true)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate('view-scan', {state: scanData})
    }
  }, [isSuccess])
  const handleSave = () => {
    if (!isLoading) {
      const dataUrl = camera.takeSnapshot()
      camera.stopCamera()
      uploadXray({dataURL: dataUrl})
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader()
      let dataUrl;
      fileReader.onload = (e) => {
        dataUrl = e.target.result
        uploadXray({dataURL: dataUrl})
      }
      fileReader.readAsDataURL(event.target.files[0])
    }
  }

  return (
    <div className='ai-scan'>
      <PageHeading heading={'AI Scan'} icon={<ScanSVG width='20px' />} />
      {
        isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div className='ai-scan-box'>
            <div className='ai-scan-bounding'></div>
            <div id='video-element'></div>
          </div>
        )
      }
      <div className='scan-warning-text'>Please ensure your CXR image is inside the Green Boundary</div>
      <div className='take-scan' onClick={handleSave}>
        <CameraIcon width={40} />
      </div>
      <label htmlFor='upload-file' className='scan-upload'>
        <ArrowUpTrayIcon width={20} /> 
        Upload from Device Storage</label>
      <input id='upload-file' type='file' accept='.png,.jpg' onChange={onImageChange} />
    </div>
  )
}

export default AiScan