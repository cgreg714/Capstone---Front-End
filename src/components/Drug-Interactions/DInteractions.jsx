
import './DInteractions.css'
import React, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button} from '@mui/material';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';



function DInteractions() {

  
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [showInteractions, setShowInteractions] = useState(false);


  const handleClose2 = () => setOpen2(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };


  const handleMedicationClick = (medication) => {
    setSelectedMedication(medication);
  };

  const handleCheckInteractions = () => {
    setShowInteractions(!showInteractions);
  }

  return (
  <>
  <Typography className='header'
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Comfortaa',
    fontWeight: 'bolder',
    color: '#828A8F',
    backgroundColor: '#9E1B32',
    gap: '9px',
    width: '100%',
    marginTop: '30px', 
  }}><h2>Drug Interactions</h2></Typography>
    
      <FormGroup className='formStyle'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 'bold',
        width: '400px',
        margin: 'auto',
        border: '5px solid black',
        borderRadius: '0.5rem',    
        backgroundColor: '#ffff',
        boxShadow: '0px 20px 20px rgba(0,0,0,0.75)'
    }}>

      <FormControl>
       <InputLabel className='labelScript'
       sx={{
        paddingTop: '12px',
        width:'410px',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'Start',
        }}>New Medication</InputLabel>
        <Input className='input' placeholder='Enter your new medication here'/>
       </FormControl>
       
       <Divider />

      <FormControl>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
      <ListItemButton onClick={handleClick1}>
       <ListItemText primary={selectedMedication || "Current Medications"} />
      {open1 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open1} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={() => handleMedicationClick("Clopidogrel")}>
          <ListItemText  secondary={selectedMedication === "Clopidogrel" ? "Clopidogrel" : ""}/>
        </ListItemButton>
      </List>
      </Collapse>
    </Box>
      </FormControl>
      

       

      </FormGroup>
      <br></br>
      <br></br>
      <Button variant="contained" className='chkBtn' onClick={handleCheckInteractions}
     sx={{
        marginTop: 10,
        width: '50%',
        color: 'black',
        fontWeight: "bolder",
        fontFamily: 'Comfortaa',
        backgroundColor: '#9e521b',
        zIndex: 1,
        "&:hover": { backgroundColor: '#828A8F',},
        }}>Check Interactions</Button>
      
      
        
      {showInteractions && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{ 
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 2,
      }}>
      
          <Typography id="header" variant="h6" component="h2">
            Possible Interactions
          </Typography>
          <Typography id="description" sx={{ mt: 2 }}>
            Consumption of this combination will rob you of the ability to have fun in social situations.
          </Typography>
          <Button variant="contained" className='chkBtn' onClick={handleCheckInteractions}
          sx={{
          marginTop: 10,
          width: '25%',
          color: 'black',
          fontWeight: "bolder",
          fontFamily: 'Comfortaa',
          backgroundColor: '#9e521b',
          zIndex: 2,
          "&:hover": { backgroundColor: '#828A8F',},
          }}>Close</Button>
          
        </Box>
        </div>
     )}
      
      
    </>
  )
}

export default DInteractions