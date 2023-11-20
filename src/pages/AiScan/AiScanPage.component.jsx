import './AiScanPage.style.css'
import PageOption from '../../components/PageOption/PageOption.component'
import {ScanSVG, HistorySVG} from '../../components/SVG/SVG.component'
import { useNavigate } from 'react-router-dom'

const AiScanPage = () => {
  const navigate = useNavigate()
  const handleClick = (path) => {
    navigate(`/doctor/${path}`)
  }
  return (
    <div className='ai-scan-page'>
      <PageOption label='New Scan' onClick={() => handleClick('scan')}>
        <ScanSVG width='170px' />
      </PageOption>
      <PageOption label='Scan History'>
        <HistorySVG width='170px' />
      </PageOption>
    </div>
  )
}

export default AiScanPage