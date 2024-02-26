import React from 'react';
import { Grid } from '@mui/material';
import AddMedicationForm from '../components/Medications/AddMedicationForm';

function Medications() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<AddMedicationForm />
			</Grid>
		</Grid>
	);
}

export default Medications;