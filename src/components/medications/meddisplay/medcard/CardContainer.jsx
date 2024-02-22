import React from 'react'
import { Container } from 'react-bootstrap'
import { medicationTestArray } from './medications.constant'
import MedCard from './MedCard'

function CardContainer() {
  return (
    <React.Fragment>
      <Container style={{backgroundColor: "#fff", padding: "10px", margin:"10px auto"}}>
        <MedCard medications={medicationTestArray} />
      </Container>
    </React.Fragment>
  )
}

export default CardContainer