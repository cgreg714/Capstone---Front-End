import React, { useContext, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import CardBody from './CardBody';
import { MedicationContext } from '../../../../../contexts/MedicationContext';
import { useTheme } from '@mui/material/styles';

function CardContainer() {
  const { medications } = useContext(MedicationContext);
  const [sortProperty, setSortProperty] = useState('dateAdded'); // Default sort property
  const theme = useTheme();

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
      <Button 
        variant='contained' 
        onClick={() => handleSort('dateAdded')} 
        sx={{ 
          mr: 2, 
          boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black' 
        }}
      >
        Sort by Date Added
      </Button>
      <Button 
        variant='contained' 
        onClick={() => handleSort('timeToTake')} 
        sx={{ 
          mr: 2, 
          boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black' 
        }}
      >
        Sort by Time to Take
      </Button>
      <Button 
        variant='contained' 
        onClick={() => handleSort('prescriber')} 
        sx={{ 
          mr: 2, 
          boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black' 
        }}
      >
        Sort by Prescriber
      </Button>
      <Grid container spacing={2}>
        {
          sortedMedications.map((medication, index) => {
            console.log('Doctor:', medication);
            console.log('Pharmacy:', medication.pharmacy.pharmacy);

            return (
              <Grid item xs={6} sm={3} md={3} key={index}>
                <Box m={2}>
                  <CardBody
                    _id={medication._id}
                    name={medication.name}
                    description={medication.description}
                    associatedDrug={medication.associatedDrug}
                    dose={medication.dose}
                    unitOfMeasurement={medication.unitOfMeasurement}
                    doctor={medication.doctor}
                    pharmacy={medication.pharmacy}
                    frequency={medication.frequency}
                    quantity={medication.quantity}
                    dateAdded={medication.dateAdded}
                  />
                </Box>
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  )
}

export default CardContainer;