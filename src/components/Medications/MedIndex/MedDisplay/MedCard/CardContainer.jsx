import React, { useContext, useState } from 'react';
import { Grid, Button } from '@mui/material';
import CardBody from './CardBody';
import { MedicationContext } from '../../../../../contexts/MedicationContext';
import { useTheme } from '@mui/material/styles';

function CardContainer() {
  const { medications } = useContext(MedicationContext);
  console.log("🚀 ~ file: CardContainer.jsx:9 ~ CardContainer ~ medications:", medications)
  const [sortProperty, setSortProperty] = useState('dateAdded');
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

  return (
    <>
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

            return (
              <Grid item xs={6} key={index}>
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
              </Grid>
            );
          })
        }
      </Grid>
    </>
  )
}

export default CardContainer;