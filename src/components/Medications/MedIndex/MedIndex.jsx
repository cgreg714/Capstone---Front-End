import React, { useState } from 'react';
import MedDisplay from './MedDisplay/DisplayContainer';
import EditMedications from './MedEdit';
import { Tabs, Tab, Card } from '@mui/material';
import AddMedicationForm from '../AddMedicationForm';

function MedIndex() {
  const [page, setPage] = useState('ADD');

  const handleClose = () => {
    setPage('DISPLAY');
  };

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <Card>
      <Tabs value={page} onChange={handleChange} sx={{ backgroundColor: '#E5E5E5' }}>
        <Tab value="ADD" label="Add Medication" style={{ color: '#E89665' }} />
        <Tab value="DISPLAY" label="Medications" style={{ color: '#E89665' }} />
        <Tab value="EDIT" label="Edit Medications" style={{ color: '#E89665' }} />
      </Tabs>
      {page === 'ADD' && <AddMedicationForm handleClose={handleClose} />}
      {page === 'DISPLAY' && <MedDisplay />}
      {page === 'EDIT' && <EditMedications />}
    </Card>
  );
}

export default MedIndex;