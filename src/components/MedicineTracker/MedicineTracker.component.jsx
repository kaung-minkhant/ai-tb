import './MedicineTracker.style.css'
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import Popup from 'reactjs-popup';
import Calendar from '../Calendar/Calendar.component'

const DayCheckBox = ({size=30, state='', label}) => {
  let stateIcon;
  if (state === 'NOT_YET') {    
  } else if (state === 'NO') {
    stateIcon = <XCircleIcon color="red" />
  } else if (state === 'YES') {
    stateIcon = <CheckCircleIcon color="green"/>
  }
  return (
    <div style={{
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
    }}>
      <div style={{
        border: "1.5px solid black",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size}px`,
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
      }}>
        { stateIcon }
      </div>
      { label && (<span style={{
        fontWeight: '600',
      }}>{label}</span>) } 
    </div>
  )
}

const WeeklyTracker = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  const state = ['NO', 'YES', 'YES', 'NO', 'YES', 'NOT_YET', 'NOT_YET']
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: 'fit-content',
      margin: '1rem',
    }}>
      {
        days.map((day, index) => {
          return <DayCheckBox key={index} size={25} label={day} state={state[index]}/>
        })
      }
    </div>
  )
}

const MedicineTracker = ({width='300px', isMobile = false}) => {
  return (
    <div className="med-tracker" style={{"--tracker-width": width}}>
      <WeeklyTracker />
      <div className="daily-med-info">
        <div className='center-div'>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <p>Today is</p>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: '700',
            }}>6 Nov 2023</p>
          </div>
        </div>
        <div className='center-div'>
          <button className='btn med-taken'>I have taken meds.</button>
        </div>
      </div>
      {
        isMobile && (
          <Popup trigger={
            <div className='view-med-calendar'>
              View Calendar
            </div>
          } modal>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
            }}>
              <Calendar />
            </div>
          </Popup>
        )
      }
    </div>
  )
}

export default MedicineTracker
