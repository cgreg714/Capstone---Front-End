import './Login.css'
import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup } from 'reactstrap';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'

//import FullButton from '../../buttons/FullButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import medication from '../../Assets/medicine130x130.png'
import { baseURL } from '../../../environment'


function Login({updateToken}) {

        const userRef = useRef(null);
        const passwordRef = useRef(null);
        const navigate = useNavigate();
        const [action, setAction] = useState("Login")
        
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          const user = userRef.current.value;
          const password = passwordRef.current.value;
    

    let bodyObj = JSON.stringify({
       user: user, password: password
      })
      const url = `${baseURL}/user/login`;
      const headers = new Headers();
      headers.append("Content-Type", "application/json")
      

    const requestOptions = {
        headers,
        body: bodyObj,
        method: 'POST'
      }
    
      try{
    
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        //console.log(data);
    
        if(data.message === 'Success! You are now logged in!') {
        updateToken(data.token)
        navigate('/profile')
        } else {
          alert(data.message)
        }
    
      } catch (err){
        console.error(err.message);
      }
    
}


  return (
    <>
    <div className="medication">                   
    <img src={medication} alt="medication" />
    </div>
    <div className="header">
        <h2>doseminder</h2>
        <h4>Login</h4>
    </div>
    <Form onSubmit={handleSubmit}>
     <FormGroup className='inputs'>

     <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="username"
          sx={{
            fontWeight:"bold"
          }}>
          Username/Email
        </InputLabel>
        <Input
          id="username-with-icon" 
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          style={{width:'400px', height:'50px', marginLeft:'40px', background: '#eaeaea'}}
        />
      </FormControl>
     </Box>

     <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="password"
        sx={{
          fontWeight:"bold"
        }}>
          Password
        </InputLabel>
        <Input
          id="password" type="password"
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          style={{width:'400px', height:'50px', marginLeft:'40px', background: '#eaeaea'}}
        />
      </FormControl>
     </Box> 
      
      
    </FormGroup>
    

    </Form>
        
        
      



            

                                
               

            

            {action==="Sign Up"?<div> </div>:
            <div className="forgot-password">Forgot your password?<span> Click Here!</span></div>
            }

            <div className="submit-container">

                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div> 

                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>

            </div> 
            <div className="copyright">
                <p>© Project Doseminder 2024</p>
            </div>
    
    </>
  )
          
}

export default Login


