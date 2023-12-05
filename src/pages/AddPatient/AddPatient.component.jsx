import './AddPatient.style.css'
import { useEffect, useState } from 'react'
import { useAddUserToMyProfileMutation } from '../../redux/Api/aiTbApi.slice'
import { setUser } from '../../redux/User/user.slice'

export const AddPatientPageLoader = () =>{
    return null
}

const AddPatientPage = () =>{

  const [userId, setUserId] = useState(null)

  const [addPatient, {data, isLoading, isSuccess, isError}] = useAddUserToMyProfileMutation();

  const handleClick = (e) =>{
    e.preventDefault();
    if (userId){
      console.log(userId)
      addPatient({userId})
    }
    
  }
  console.log('userid',userId)

    return (
        <div>
            <form className="f-orm" onSubmit={handleClick}>
              <label>
                Patient ID:
                <input className="in-put" onChange = {(e) => setUserId(e.target.value)} value={userId}/>
              </label>
              <input type="submit" value="Submit" onClick={(e) => handleClick(e)}/>
            </form>
            {
              isSuccess && <h1>Successfully added user.</h1>
            }
          {
            isError && <h1>Failed to add user. Contact admin team.</h1>
          }
        </div>
    )
}

export default AddPatientPage;
