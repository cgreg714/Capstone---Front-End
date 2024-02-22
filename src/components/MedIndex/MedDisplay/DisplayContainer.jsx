import React from 'react'
import { Container } from 'react-bootstrap';
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
    <React.Fragment>
    <Container style={styles.medContainer}>
        <h1 style={styles.containerTitle}>Medications</h1>
        <DisplayNav />
        <CardContainer />
    </Container>
    </React.Fragment>
  )
}

export default MedDisplay