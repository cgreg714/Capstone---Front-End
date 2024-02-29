import React, { useContext, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import CardBody from './CardBody';
import { MedicationContext } from '../../../../../contexts/MedicationContext';

function CardContainer() {
  const { medications } = useContext(MedicationContext);
  const [sortProperty, setSortProperty] = useState('dateAdded'); // Default sort property

  const handleSort = (property) => {
    setSortProperty(property);
  };

  const sortedMedications = [...medications].sort((a, b) => {
    if (a[sortProperty] < b[sortProperty]) {
      return -1;
    }
    if (a[sortProperty] > b[sortProperty]) {
      return 1;
    }
    return 0;
  });

  const formatIntakes = (intakes) => {
    return intakes.map(intake => {
      const date = new Date(intake.takenAt);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
      return `${formattedTime} - ${intake.quantity} Taken.`;
    });
  };

  return (
    <div>
      <Button variant='contained' onClick={() => handleSort('dateAdded')} sx={{ mr: 2 }}>Sort by Date Added</Button>
      <Button variant='contained' onClick={() => handleSort('timeToTake')} sx={{ mr: 2 }}>Sort by Time to Take</Button>
      <Button variant='contained' onClick={() => handleSort('prescriber')} sx={{ mr: 2 }}>Sort by Prescriber</Button>
      <Grid container spacing={2}>
        {
          sortedMedications.map((medication, index) => (
            <Grid item xs={6} sm={3} md={3} key={index}>
              <Box m={1}>
                <CardBody
                  name={medication.name}
                  description={medication.description}
                  unitOfMeasurement={medication.unitOfMeasurement}
                  dose={medication.dose}
                  frequency={medication.frequency}
                  quantity={medication.quantity}
                  dateAdded={medication.dateAdded}
                  prescriber={medication.prescriber}
                  associatedDrug={medication.associatedDrug}
                  medicationIntakes={formatIntakes(medication.medicationIntakes).map((intake, index) => <div key={index}>{intake}</div>)}
                  />
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default CardContainer;