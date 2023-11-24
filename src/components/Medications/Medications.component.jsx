import { useEffect, useMemo, useState } from 'react'
import './Medications.style.css'
import Popup from 'reactjs-popup'
import { useCreateMedicationMutation, useGetMedicationQuery } from '../../redux/Api/aiTbApi.slice'
import { useNavigate } from 'react-router-dom'

const Medications = ({medications, isSuccess, isMutationSuccess, isDoctor, createMedication, patientId}) => {
  const navigate = useNavigate()
  const [medData, setMedData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    repeatsEvery: 'day',
  })

  const listRenders = useMemo(() => {
    const listRenders = []
    medications.forEach(medication => {
      listRenders.push(
        <tr key={medication.medicationId}>
          <td>{medication.name}</td>
          <td>{medication.dailyDose}</td>
        </tr>
      )
    })
    return listRenders
  }, [medications])
  
  useEffect(() => {
    if (isMutationSuccess) {
      navigate(0)
    }
  }, [isMutationSuccess])
  const handleOnSubmit = (event, close) => {
    event.preventDefault()
    createMedication({
      patientId: patientId,
      data: {
        ...medData
      }
    })
    close()
  }
  return (
    <div className='medications'>
      <div className='medications-title'>Medications</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Daily Dose</th>
          </tr>
        </thead>
        <tbody>
          {
            listRenders
          }
        </tbody>
      </table>
      {
        isDoctor && (
          <Popup trigger={
            <div className='medications-add'>Add Medications</div>
          } modal>
            {
              close => (
                <div className='med-form-container'>
                  <h3>Medication Information</h3>
                  <form onSubmit={event => handleOnSubmit(event, close)} className='med-form'>
                    <label>
                      Medication Name: <input type='text' 
                        placeholder='med one' 
                        value={medData.name} 
                        onChange={e => setMedData({
                          ...medData,
                          name: e.target.value
                        })}></input>
                    </label>
                    <label>
                      Start Date: <input type='date' 
                        // placeholder='med one' 
                        value={medData.startDate} 
                        onChange={e => setMedData({
                          ...medData,
                          startDate: e.target.value
                        })}></input>
                    </label>
                    <label>
                      End Date: <input type='date' 
                        // placeholder='med one' 
                        value={medData.endDate} 
                        onChange={e => setMedData({
                          ...medData,
                          endDate: e.target.value
                        })}></input>
                    </label>
                    <label>
                      Repeat Every: 
                      <select value={medData.repeatsEvery} onChange={e => setMedData({
                        ...medData,
                        repeatsEvery: e.target.value
                      })}>
                        <option value="day">Day</option>
                        <option value="month">Month</option>
                      </select>
                    </label>
                    <button type='submit'>Add</button>
                  </form>
                </div>
              )
            }
          </Popup>
        )
      }
    </div>
  )
}

export default Medications