import './ViewAllScans.style.css'

const ViewScan = ({width, positive}) => {
  return (
    <div className='view-scan1' style={{"--view-scan-width": width}}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <div className='img-container'>
          <img src='./images/view_all_chest_x_ray.png' />
        </div>
        <div className='img-container'>
          <img src='./images/view_all_chest_x_ray_heat_map.png' />
        </div>
      </div>
      <div className='info-container'>
        <span>Date:{' '} 
          <span style={{
            fontWeight: '700',
          }}>{new Date().toDateString()}
          </span>
        </span>
        <span>Result:{' '}  
          <span style={{
            color: positive ? 'green' : 'red',
            fontWeight: '700',
          }}>
            {
              positive ? 'Positive' : 'Negative'
            }
          </span>
        </span>
      </div>
      <button className='btn view-scan-btn'>View Scan</button>
    </div>
  )
}

const ViewAllScans = ({width='300px'}) => {
  return (
    <div className='view-all-scans'>
      <h3>Scan History</h3>
      <div className='view-all-scans-items'>
        <ViewScan positive={true} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={true} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={false} width={width} />
        <ViewScan positive={true} width={width} />
      </div>
    </div>
    
  )
}

export default ViewAllScans
