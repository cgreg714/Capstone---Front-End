import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import CardBody from './CardBody';
import { MedicationContext } from '../../../../../contexts/MedicationContext';

function CardContainer() {
  const { medications } = useContext(MedicationContext);

  return (
      <Grid container spacing={2}>
        {
          medications.map((medication, index) => (
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
                  medicationIntakes={medication.medicationIntakes}
                />
              </Box>
            </Grid>
          ))
        }
      </Grid>
  )
}

export default CardContainer;