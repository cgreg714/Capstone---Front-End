import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, List, ListItem, Box } from '@mui/material';

function CardBody({ name, description, unitOfMeasurement, dose, frequency, quantity, dateAdded, prescriber, associatedDrug, medicationIntakes }) {
    const trueFrequencies = Object.keys(frequency).filter(key => frequency[key] === true);
    const time = new Date(frequency.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    return (
        <Box m={1}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <List>
                        <ListItem>{associatedDrug.name} - {dose} {unitOfMeasurement} </ListItem>
                        <ListItem>Prescriber: {prescriber}</ListItem>
                        <ListItem>Frequency: {trueFrequencies.join(', ')}</ListItem>
                        <ListItem>Time: {time}</ListItem>
                        <ListItem>Medication Intakes: {JSON.stringify(medicationIntakes)}</ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <List>
                        <ListItem>Quantity: {quantity}</ListItem>
                        <ListItem>Date Added: {new Date(dateAdded).toLocaleDateString()}</ListItem>
                    </List>
                    {/* <ButtonGroup variant="text">
                        <Button onClick={() => console.log('click view', { name })}>View</Button>
                        <Button onClick={() => console.log('click edit', { name })}>Edit</Button>
                        <Button onClick={() => console.log('click delete', { name })}>Delete</Button>
                    </ButtonGroup> */}
                </CardActions>
            </Card>
        </Box>
    )
}

export default CardBody;