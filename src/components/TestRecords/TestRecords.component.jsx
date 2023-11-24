import './TestRecords.style.css'

const TestRecord = ({date, test}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '90%',
    }}>
      <span>{date}</span>
      <span>{test}</span>
    </div>
  )
}

const TestRecords = ({width='300px'}) => {
  const recordData = [
    {
      date: new Date().toDateString(),
      test: 'Lung X Ray Scan'
    },
    {
      date: new Date().toDateString(),
      test: 'Lung X Ray Scan'
    },
    {
      date: new Date().toDateString(),
      test: 'Lung X Ray Scan'
    },
    {
      date: new Date().toDateString(),
      test: 'Lung X Ray Scan'
    },
  ]
  return (
    <div className="test-records" style={{"--test-records-width": width}}>
      <div className='test-records-header'>
        Test Records
      </div>
      <div className='test-records-list'>
        {
          recordData.map((record, index) => {
            return <TestRecord key={index} date={record.date} test={record.test} />
          })
        }
      </div>
      <div className='test-records-view-more'>
        View More Test Records
      </div>
    </div>
  )
}

export default TestRecords
