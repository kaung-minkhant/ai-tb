import './AiScanPage.style.css'
import PageOption from '../../components/PageOption/PageOption.component'
import {ScanSVG, HistorySVG} from '../../components/SVG/SVG.component'
import { useNavigate } from 'react-router-dom'
import { getWidth } from '../../utils'

const AiScanPage = () => {
  const navigate = useNavigate()
  const handleClick = (path) => {
    navigate(`/doctor/${path}`)
  }
  return (
    <div className='ai-scan-page'>
      <PageOption label='New Scan' onClick={() => handleClick('scan')} width={90}>
        <ScanSVG width={`${getWidth(70)}px`} />
      </PageOption>
      <PageOption label='Scan History' width={90} onClick={() => handleClick('allscans')}>
        <HistorySVG width={`${getWidth(70)}px`} />
      </PageOption>
    </div>
  )
}

export default AiScanPage