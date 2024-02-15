import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardBody from './CardBody';

function MedCard(props) {

    console.log('props of MedCard', props);

  return (
    <React.Fragment>
        <Row>
        {
                    props.medications.map((medication,index)=> (
                        <Col md="4" key={index}>
                        <CardBody
                        name={medication.name}
                        description={medication.description}
                        prescriber={medication.prescriber}
                        quantity={medication.quantity}
                        dateAdded={medication.dateAdded}
                        />
                        </Col>
                    ))
                }

        </Row>
    </React.Fragment>
  )
}

export default MedCard