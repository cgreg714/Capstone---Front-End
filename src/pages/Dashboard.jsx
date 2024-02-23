import React from 'react';
import { Grid } from '@mui/material';
import MedicationTable from '../components/Medications/MedicationTable';
import MedicationHistory from '../components/Medications/MedicationIntakeHistory';
import MedIntakeFormTwo from '../components/Medications/MedIntakeFormTwo';

function Dashboard() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} sm={12} md={12} lg={10} xl={6}>
				<MedicationTable />
			</Grid>
			<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
				<MedicationHistory />
			</Grid>
		</Grid>
	);
}

export default Dashboard;
