import React, { useEffect, useState } from 'react';
import './Calendar.style.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function ServerDay(props) {
  const {daystohighlight = [], states = [], day, outsideCurrentMonth, ...other} = props
  let badgeContent;
  let index = daystohighlight.indexOf(day.date())
  if (index >= 0 && !outsideCurrentMonth) {
    if (states[index]) {
      badgeContent = <CheckCircleIcon color='green' width={15} />
    } else {
      badgeContent = <XCircleIcon color='red' width={15} />
    }
  } else {
    badgeContent = undefined
  }

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
    >
      <PickersDay 
        outsideCurrentMonth={false}
        {...other} day={day} />
    </Badge>
  );
}

const getData = (month) => {
  const currentMonth = dayjs().$M
  if (currentMonth === month) {
    return {
      days: [1,2,3,4, 17, 24],
      state: [true, false, true, false, false, true]
    } 
  }
  return {
    days: [],
    state: [],
  }
}

const Calendar = ({width='300px'}) => {
  const [meddays, setMedDays] = useState({
    daystohighlight: [],
    states: []
  })
  // const height = document.querySelector('.MuiDayCalendar-monthContainer')?.getBoundingClientRect().height
  const height = 200;

  useEffect(() => {
    const medDays = getData(dayjs().$M)
    setMedDays({
      daystohighlight: medDays.days,
      states: medDays.state
    })
  }, [])

  function handleMonthChange(event) {
    const monthChanged = event.$M
    const medDays = getData(monthChanged)
    setMedDays({
      daystohighlight: medDays.days,
      states: medDays.state
    })
  }
  return (
    <div className='calendar' style={{"--month-height": `${ height }px`, "--calendar-width": width}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          // sx={{
          //   height: "200px",
          //   width: "200px",
          // }}         
          views={['month', 'day']}
          onMonthChange={handleMonthChange}
          slots={{
            day: ServerDay
          }}
          slotProps={{
            day: {
              daystohighlight: meddays.daystohighlight,
              states: meddays.states
            }
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

export default Calendar
