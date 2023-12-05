import './AddPatient.style.css'
import { useEffect, useState } from 'react'


export const AddPatientPageLoader = () =>{
    return null
}

const AddPatientPage = () =>{
    return (
        <div>
            <form className="f-orm">
              <label>
                Patient ID:
                <input type="text" name="name" className='in-put' />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddPatientPage;
