import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import DisplayNav from './DisplayNav';
import CardContainer from './MedCard/CardContainer';

function MedDisplay(props) {

    let styles={
        medContainer: {
            backgroundColor: "#9E1B32",
            padding: "10px",
            margin: "0 auto"
        },
        containerTitle: {
            color: '#FFF'
        }
    }

  return (
    <Box sx={styles.medContainer}>
        <Typography variant="h4" sx={styles.containerTitle}>Medications</Typography>
        {/* <DisplayNav /> */}
        <CardContainer />
    </Box>
  )
}

export default MedDisplay;