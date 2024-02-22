import React from 'react';
import { Grid } from '@mui/material';
import MedicationTable from '../components/Medications/MedicationTable';
import MedicationHistory from '../components/Medications/MedicationIntakeHistory';

function Dashboard() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<MedicationTable />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationHistory />
			</Grid>
		</Grid>
	);
}

export default Dashboard;