import './MedicineTracker.style.css'
import { CheckCircleIcon, XCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid"
import Popup from 'reactjs-popup';
import Calendar from '../Calendar/Calendar.component'
import { getWidth } from '../../utils';
import { useGetMedicationQuery, useTakeMedicationMutation } from '../../redux/Api/aiTbApi.slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DayCheckBox = ({size=30, state='', label}) => {
  let stateIcon;
  if (state === 'NOT_YET') {    
  } else if (state === 'NO') {
    stateIcon = <XCircleIcon color="red" />
  } else if (state === 'YES') {
    stateIcon = <CheckCircleIcon color="green"/>
  } else if (state === 'OUTSIDE') {
    stateIcon = <MinusCircleIcon color="grey" />
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

const WeeklyTracker = ({state}) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  // const state = ['NO', 'YES', 'YES', 'NO', 'YES', 'NOT_YET', 'NOT_YET']
  return (
    <div style={{
      display: 'flex',
      gap: '0.7rem',
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

const MedicineTracker = ({medication, width=180 , isMobile = false, hideControl=false, isDoctor, patientId}) => {
  const navigate = useNavigate()
  const [takeMedication, {isSuccess: isTakeMedicationMutationSuccess}] = useTakeMedicationMutation()
  const [weeklyStatus, setWeeklyStatus] = useState(getWeekData(medication))

  useEffect(() => {
    if (isTakeMedicationMutationSuccess) {
      const newData = [...weeklyStatus.weekStatus]
      newData[weeklyStatus.currentDateIndex] = 'YES'
      setWeeklyStatus({
        ...weeklyStatus,
        weekStatus: newData
      })
    }
  }, [isTakeMedicationMutationSuccess])
  console.log('week', weeklyStatus)

  const handleTakeMed = () => {
    takeMedication(medication.medicationId)
  }
  function getDaysArray(start, end) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt).toDateString());
      }
      return arr;
  };

  function addPadding(total, input, direction) {
    const output = [...input]
    let paddingLength = total - input.length
    if (paddingLength > 0) {
      if (direction === 'right') {
        for (let index = 0; index < paddingLength; index++) {
          output.push('NOT_YET')
        }
      }
      if (direction === 'left') {
        for (let index = 0; index < paddingLength; index++) {
          output.unshift('OUTSIDE')
        }
      }
    }
    return output
  }

  function getWeekData(medication) {
    // console.log('medication', medication)
    if (!medication) return null
    const currentDate = new Date()
    // if (!medication.MedTrackers) {
    //   return {
    //     weekStatus: [],
    //     startDate: new Date(),
    //     endDate: new Date()
    //   }
    // }
    const trackers = medication.MedTrackers ?? 0;
    const startDate = new Date(medication.startDate);
    const endDate = new Date(medication.endDate);
    const daysArray = getDaysArray(startDate, endDate)
    console.log(daysArray)
    const statusArray = new Array(daysArray.length).fill("NOT_YET")
    daysArray.forEach((day, index) => {
      let trackerDay;
      if (!trackers) {
        trackerDay = []
      } else {
        trackerDay = trackers?.filter(tracker => new Date(tracker.doseTime).toDateString() === day )
      }
      if (trackerDay.length === 0 ) {
        if (new Date(day) < currentDate) {
          statusArray[index] = 'NO'
        } else {
          statusArray[index] = 'NOT_YET'
        }
      } else {
        statusArray[index] = 'YES'
      }
    })
    const currentIndex = daysArray.indexOf(currentDate.toDateString()) 
    const currentDay = currentDate.getDay() 
    let weekStartIndex = currentIndex - currentDay
    let weekEndIndex = currentIndex + (6 - currentDay)
    let padding = null;
    if (weekStartIndex < 0) {
      weekStartIndex = 0
      padding = 'left';
    }
    if (weekEndIndex > daysArray.length - 1) {
      weekEndIndex = daysArray.length - 1
      padding = 'right';
    }
    let weekStatus = statusArray.slice(weekStartIndex, weekEndIndex+1)
    weekStatus = addPadding(7, weekStatus, padding)
    return {
      weekStatus: weekStatus,
      startDate: startDate,
      endDate: endDate,
      currentDateIndex: currentDay,
    }
  }

  return (
    <div className="med-tracker" style={{"--tracker-width": `${getWidth(width)}px`}}>
      <div className='med-tracker-title'>&#128138; {medication?.name}</div>
      <div className='weekTrackerScroll'>
        <WeeklyTracker state={weeklyStatus.weekStatus} />
      </div>
      {
        !hideControl && (
          <div className="daily-med-info">
            <div className='center-div'>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <p>Today is</p>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                }}>6 Nov 2023</p>
              </div>
            </div>
            <div className='center-div'>
              <button onClick={handleTakeMed} className='btn med-taken'>I have taken meds.</button>
            </div>
          </div>
        )
      }
      {
        isMobile && (
          <Popup trigger={
            <div className='view-med-calendar'>
              View Calendar
            </div>
          } 
          modal
          >
            {
              close => (
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                }}>
                  <div style={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    border: '2px solid black',
                    borderRadius: '1rem',
                  }}>
                    <Calendar />
                    <button onClick={() => close()} className='btn'>Close</button>
                  </div>
            </div>
              )
            }
          </Popup>
        )
      }
    </div>
  )
}

export default MedicineTracker
