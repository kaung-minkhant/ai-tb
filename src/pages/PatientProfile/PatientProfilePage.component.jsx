import { useMediaQuery } from '@uidotdev/usehooks'
import TestRecords from '../../components/TestRecords/TestRecords.component'
import './PatientProfilePage.style.css'
import MedicineTracker from '../../components/MedicineTracker/MedicineTracker.component'
import Log from '../../components/Log/Log.component.jsx'
import {UserIcon} from '@heroicons/react/24/outline'
import ProfileProfile from '../../components/HelperComponents/ProfileProfile.component'
import { getUserRole, getWidth } from '../../utils.js'
import Medications from '../../components/Medications/Medications.component.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { useCreateMedicationMutation, useGetMedicationQuery, useAddUserRecordMutation } from '../../redux/Api/aiTbApi.slice.js'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, selectUserName } from '../../redux/User/user.slice.js'
import Popup from 'reactjs-popup'

const PatientProfilePage = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 650px)")
  const user = useSelector(selectUser)
  const username = useSelector(selectUserName)
  const {state} = useLocation()
  const [medications, setMedications] = useState([])
  const {patientId} = useParams()
  const isDoctor = window.location.href.includes('doctor')
  const [createMedication, {isSuccess: isMedicationMutationSuccess}] = useCreateMedicationMutation()
 
   const [addRecord, {data: rData, isLoading: rIsLoading, isSuccess: rIsSuccess}] = useAddUserRecordMutation();
const [recData, setRecData] = useState({
    recordDate: "",
    type: "",
    tests: [
      
    ]
  })
 
  const {data: medication, isLoading, isSuccess: isMedicationQuerySuccess} = useGetMedicationQuery({
    isDoctor: isDoctor,
    patientId: patientId
  })
  useEffect(() => {
    if (isMedicationQuerySuccess) {
      setMedications(medication.data.medications)
    }
  }, [isMedicationQuerySuccess])

  // console.log(medications)

  return (
    <div className='patient-profile'>
      <ProfileProfile name={ state?.userId ? `${state.firstName} ${state.lastName}` : username} imagePath='./images/patient_profile.png' />
      
      <div className="grids-container">
        <div className="left-grid">
          {/* <div className='patient-profile-buttons'></div> */}
            <div className='patient-profile-cards'>
              {
                +getUserRole() !== 2 && (
                  <div className='doctor-container'>
                    <h5 className='doctor-title'>Your Doctor</h5>
                    <Log name={`Dr ${user.doctorName}`} id={`Doctor ID: ${user.doctorId}`} icon={<UserIcon width={20}/>} />
                  </div>
                )
              }
              {/* <Log name={'Soe Kyaw Moe'} id={'Caregiver'} icon={<UserIcon width={20}/>} /> */}
          </div>

          <div className="med-info-gap">
            <h5 className='doctor-title'>Medication History</h5>
            {
              medications.map(medication => {
                return (
                  <MedicineTracker medication={medication} key={medication.medicationId} width={180} isMobile={isMobile} hideControl={true} isDoctor={isDoctor} patientId={patientId}/>
                )
              })
            }
            {/* {
              !isMobile && (
                <Calendar width="300px" />
              )
            } */}
          </div>
          
          {
            isDoctor && 
            <Popup trigger={
              <div className='record-add'>Add Record</div>
            } modal>
              {
                close => (
                  // <h1 onClick={close}>hee</h1>
                  <div className='white-card'>
                    <label>
                      Record Date: <input type='date' 
                        value={recData.startDate} 
                        onChange={e => setRecData({
                          ...recData,
                          recordDate: e.target.value
                        })}></input>
                    </label>
                    <label>
                      Record Type: <input type='text' 
                        value={recData.type} 
                        onChange={e => setRecData({
                          ...recData,
                          type: e.target.value
                        })}></input>
                    </label>
                    <div id='tests'>
                     
                     {
                      recData.tests.map((test,index)=>(
                        <div className="form-test">
                          <label>
                            Name: <input type='text' 
                              value={recData.tests[index].name} 
                              onChange={e => {
                                let arr = recData.tests
                                arr[index].name = e.target.value
                                setRecData({
                                  ...recData,
                                  tests: arr
                                })
                              }}></input>
                          </label>
                          <label>
                            Value: <input type='text' 
                              value={recData.tests[index].value} 
                              onChange={e => {
                                let arr = recData.tests
                                arr[index].value = e.target.value
                                setRecData({
                                  ...recData,
                                  tests: arr
                                })
                              }}></input>
                          </label>
                          <label>
                            Unit: <input type='text' 
                              value={recData.tests[index].unit} 
                              onChange={e => {
                                let arr = recData.tests
                                arr[index].unit = e.target.value
                                setRecData({
                                  ...recData,
                                  tests: arr
                                })
                              }}></input>
                          </label>
                          <label>
                            lowRange: <input type='text' 
                              value={recData.tests[index].lowRange} 
                              onChange={e => {
                                let arr = recData.tests
                                // console.log("dfsdfsdfsd")
                                // console.log(arr)
                                arr[index].lowRange = e.target.value
                                setRecData({
                                  ...recData,
                                  tests: arr
                                })
                              }}></input>
                          </label>
                          <label>
                            highRange: <input type='text' 
                              value={recData.tests[index].highRange} 
                              onChange={e => {
                                let arr = recData.tests
                                // console.log("dfsdfsdfsd")
                                // console.log(arr)
                                arr[index].highRange = e.target.value
                                setRecData({
                                  ...recData,
                                  tests: arr
                                })
                              }}></input>
                          </label>
                          <button onClick={()=>{
                            let arr = recData.tests
                            // console.log("dfsdfsdfsd")
                            // console.log(arr)
                            arr.splice(index,1)
                            setRecData({
                              ...recData,
                              tests: arr
                            })
                          }}>REMOVE</button>
                        </div>
                      ))
                     }

                    </div>

                    

                    <button onClick={()=>{
                      let arr = recData.tests
                      arr.push({
                          name:"",
                          value: "",
                          unit: "",
                          lowRange: "",
                          highRange: ""
                      })
                      
                      setRecData({
                        ...recData,
                        tests: arr
                      })
                    }}>ADD TEST</button>
                    <button onClick={
                      ()=>{
                        console.log("dhf", patientId)
                        addRecord({userId: patientId, body:recData})
                        close()
                      }

                    }>SAVE</button>
                    <button onClick={close}>CLOSE</button>
                  </div>
                )
              }

            </Popup>
          }
          
          
        </div>
        <div className="right-grid">

            
        <div className='patient-profile-med-info'>
        
          <div>
            <Medications 
              medications={medications} 
              isSuccess={isMedicationQuerySuccess} 
              isMutationSuccess={isMedicationMutationSuccess} 
              isDoctor={isDoctor}
              createMedication={createMedication}
              patientId={patientId}
            />
          </div>
            <div>
              <TestRecords width={`${getWidth(180)}px`} patientId={patientId}/> 
            </div>
          </div>
        
        
        </div>

      </div>
      
      
    </div>
  )
}

export default PatientProfilePage
