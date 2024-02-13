import './ABuddy.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import medication from '../../Components/Assets/medicine130x130.png';
import { baseURL } from '../../environment';


function ABuddy(props) {
//console.log(props)
    
    const firstRef = useRef();
    const lastRef = useRef();
    const relationRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const first = firstRef.current.value;
        const last = lastRef.current.value;
        const relation = relationRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        let buddyObj = JSON.stringify({
            first, last, relation, email, phone
        })

        const url = `${baseURL}/user/ABuddy`

        let headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append('Authorization', props.token)

        const requestOptions = {
            headers: headers,
            body: buddyObj,
            method: 'POST'
        }

        try{

            const res = await fetch(url, requestOptions);
            const data = await res.json();


            props.createABuddy()
            if(data.message === `${first}${last} has been added as an Accountabili-buddy!`)
            {console.log(first,last)} else {
                alert(data.message)
            }

            } catch (err){
                console.error(err.message)
            }
        }
        const [action, setAction] = useState("Add,change, or remove a buddy!")

return (
<div className="container">

            <div className="medication">                   
            <img src={medication} alt="medication" />
            </div>

            <div className="header">
            <div className="text">{action}</div> 
            <div className="underline"></div>
            </div>
            <div className="subtitle">
            <span>Add (or modify) a friend or family member to help</span> 
            <span>keep you on track.</span>
            <br></br>
            <span>They will receive a text when it's time for</span>
            <span>you to take your medication.</span>
            </div>

                <div className="inputs">
                    <TextField id="input" innerRef={firstRef} label="First Name" variant="filled" style={{width:'400px', height:'50px', marginLeft:"40px"}} />
                    
                    <TextField id="input" innerRef={lastRef} label="Last Name" variant="filled" style={{width:'400px', height:'50px', marginLeft:"40px"}} />
                    
                    <TextField id="input" innerRef={relationRef} label="Relation" variant="filled" style={{width:'400px', height:'50px', marginLeft:"40px"}} />
                    
                    <TextField id="input" innerRef={emailRef} label="Email Address" variant="filled" style={{width:'400px', height:'50px', marginLeft:"40px"}} />
                    
                    <TextField id="input" innerRef={phoneRef} label="10-digit Phone Number" variant="filled" style={{width:'400px', height:'50px', marginLeft:"40px"}} />                    
                </div>

            <div className="submit-container">

                <div className={action==="Add/Modify"?"submit gray":"submit"} onClick={()=>{setAction("Add/Modify")}}>Add/Modify</div>
            
                <div className={action==="Delete"?"submit gray":"delete"} onClick={()=>{setAction("Delete")}}>Delete</div>

            </div>
             
            <div className="copyright">
                <p>© Project Doseminder 2024</p>
            </div>   
        </div>
    )
    }


export default ABuddy

/* )

    function newBuddy() {
        alert("Your buddy has been added!");
    }
     */