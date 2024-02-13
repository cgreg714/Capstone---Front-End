import React, { useState } from 'react'
/* import { Button, ButtonGroup } from 'reactstrap'; */
import TimePicker from 'react-time-picker';
import './Medication.css'
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import medication from '../Assets/medicine130x130.png'

/* function Medication() { */

    



export const NewMedication = () => {

    const [action, setAction] = useState("Add a New Medication");
    const [rSelected, setRSelected] = useState(null);
    const [value, onChange] = useState('00:00');

  return (
    <div className="container">

            <div className="medication">                   
            <img src={medication} alt="medication" />
            </div>

            <div className="header">
                <div className="text">{action}</div> 
                <div className="underline"></div>
            </div>
            
                <div className="inputs">
                    <div className="input">
                    <input type="text"placeholder="Medication Name"/>    
                    </div>

                    <div className="input">
                    <input type="text"placeholder="Dosage"/>
                    </div>

                    <div className="input">
                    <input type="text"placeholder="Quantity"/>
                    </div>

                    <div className="input">
                    <input type="text"placeholder="Dose"/>
                    </div>

                    <div className="input">
                    <input type="text"placeholder="Expiration Date"/>
                    </div>

                    <div>
                    <h5>Time of Dose</h5>
                    <TimePicker onChange={onChange} value={value} />
                    </div>

                    <div>
                    <h5>Refillable?</h5>
                        
                           {/*  <Button
                            color="primary"
                            outline
                            onClick={() => setRSelected(1)}
                            active={rSelected === 1}
                            >Yes</Button>
                        
                            <Button
                            color="primary"
                            outline
                            onClick={() => setRSelected(2)}
                            active={rSelected === 2}
                            >No</Button>
                        
                            <p>Selected: {rSelected}</p> */}
                    </div>

            <div className="submit-container">
                <div className={action==="Add med"?"submit gray":"submit"} onClick={()=>{setAction("Add med")}}>Add medication</div>
            </div>

            <div className="copyright">
                <p>© Project Doseminder 2024</p>
            </div>    
    </div>
    </div>
  )
}

export default NewMedication;