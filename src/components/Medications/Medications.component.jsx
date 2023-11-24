import { useState } from 'react'
import './Medications.style.css'
import Popup from 'reactjs-popup'
import { useCreateMedicationMutation, useGetMedicationQuery } from '../../redux/Api/aiTbApi.slice'

const Medications = ({patientId}) => {
  const isDoctor = window.location.href.includes('doctor')
  const [createMedication] = useCreateMedicationMutation()
  const {data: medication, isLoading} = useGetMedicationQuery({patientId})
  console.log(medication)
  const [medData, setMedData] = useState({
    name: '',
    stateDate: '',
    endDate: '',
    repeatsEvery: 'day',
  })
  console.log(medData)
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
          <tr>
            <td>Med one</td>
            <td>123</td>
          </tr>
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
                        value={medData.stateDate} 
                        onChange={e => setMedData({
                          ...medData,
                          stateDate: e.target.value
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