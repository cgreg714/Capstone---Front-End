import React from 'react';
import { Grid } from '@mui/material';
import MedDisplay from '../components/Medications/meddisplay/MedDisplay';
import AddMedicationForm from '../components/Medications/AddMedicationForm';

function Medications() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3} pt={8}>
			<Grid item xs={12} md={6}>
				<AddMedicationForm />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedDisplay />
			</Grid>
		</Grid>
	);
}

export default Medications;