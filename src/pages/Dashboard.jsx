import React from 'react';
import { Grid } from '@mui/material';
import MedicationTable from '../components/Medications/MedicationTable';
import MedicationIntakeHistory from '../components/Medications/MedicationIntakeHistory';

function Dashboard() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} sm={12} md={12} lg={10} xl={8}>
				<MedicationTable />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
				<MedicationIntakeHistory />
			</Grid>
		</Grid>
	);
}

export default Dashboard;
