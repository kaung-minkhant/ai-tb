import { useEffect } from 'react'
import { useGetScansQuery } from '../../redux/Api/aiTbApi.slice'
import { getUserId } from '../../utils'
import './ViewAllScans.style.css'

const ViewScan = ({width, result}) => {
  return (
    <div className='view-scan1' style={{"--view-scan-width": width}}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <div className='img-container' style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src={result.originalImg} />
        </div>
        <div className='img-container'>
          <img src={result.gradImg} />
        </div>
      </div>
      <div className='info-container'>
        <span>Date:{' '} 
          <span style={{
            fontWeight: '700',
          }}>{new Date().toDateString()}
          </span>
        </span>
        <span>
          <span style={{
            fontWeight: '700',
          }}>
            Chance: {(parseFloat(result.result)*100).toFixed(2)}%
          </span>
        </span>
      </div>
      <button className='btn view-scan-btn'>View Scan</button>
    </div>
  )
}

const ViewAllScans = ({width='300px'}) => {
  const {data: scans, isLoading: isScansLoading, isSuccess: isScansSuccess, refetch} = useGetScansQuery(+getUserId())
  useEffect(() => {
    refetch()
  }, [])
  return (
    <div className='view-all-scans'>
      <h3>Scan History</h3>
      <div className='view-all-scans-items'>
        {
          scans && (
            scans.data.aiResults.map(result => (
              <ViewScan key={result.aiResultId} result={result} width={width}/>
            ))
          )
        }
        {/* <ViewScan positive={true} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={true} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={true} width={width} /> */}
      </div>
    </div>
    
  )
}

export default ViewAllScans
