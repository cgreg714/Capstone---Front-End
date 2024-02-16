import React from 'react'
import { medicationsTestArray } from './medications.constant'
import MedCard from './MedCard'
import { Container } from 'react-bootstrap'

function CardContainer() {
  return (
    <React.Fragment>
      <Container style={{backgroundColor: "#000", padding: "10px", margin:"10px auto"}}>
      <MedCard medications={medicationsTestArray} />
      </Container>
    </React.Fragment>
  )
}

export default CardContainer