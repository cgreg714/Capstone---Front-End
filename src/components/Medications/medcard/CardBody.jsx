import React from 'react'
import { ListGroup, Card, Button, ButtonGroup } from 'react-bootstrap'

function CardBody({name, description, dosages, quantity, dateAdded, prescriber, timeOfDay, dayOfTheWeek}) {
  return (
    <React.Fragment>
        <Card style={{margin:"5px auto", width:"125pt"}}>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
            <ListGroup.Item>Prescriber: {prescriber}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
            <ListGroup horizontal style={{margin:"10px auto"}}>
                <ListGroup.Item>{quantity}</ListGroup.Item>
                <ListGroup.Item>{dateAdded}</ListGroup.Item>
            </ListGroup>
            <ButtonGroup vertical>
            <Button style={{ fontSize:"14px", backgroundColor:"green", borderColor:"green"}} onClick={()=> console.log('click view', {name})}>View</Button>
            <Button style={{ fontSize:"14px", backgroundColor:"gray", borderColor:"gray"}} onClick={()=> console.log('click edit', {name})}>Edit</Button>
            <Button style={{ fontSize:"14px", backgroundColor:"red", borderColor:"red"}} onClick={()=> console.log('click delete', {name})}>Delete</Button>
            </ButtonGroup>
        </Card.Footer>
        </Card>
    </React.Fragment>
  )
}

export default CardBody