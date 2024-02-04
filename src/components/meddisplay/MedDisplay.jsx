import React from 'react'
import { Container } from 'react-bootstrap';
import CardContainer from '../medcard/CardContainer';
import MedNav from '../mednav/MedNav';

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
    <React.Fragment>
    <Container style={styles.medContainer}>
        <h2 style={styles.containerTitle}>Medications</h2>
        <MedNav />
        <CardContainer />
    </Container>
    </React.Fragment>
  )
}

export default MedDisplay