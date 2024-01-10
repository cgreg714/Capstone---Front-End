import React from 'react';
import { Grid } from '@mui/material';
import MedicationSubmitForm from '../components/medicationSubmitForm';
import MedicationSchedule from '../components/medicationSchedule';

function Dashboard() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<MedicationSubmitForm />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationSchedule />
			</Grid>
		</Grid>
	);
}

export default Dashboard;