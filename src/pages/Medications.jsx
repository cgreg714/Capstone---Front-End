import React from 'react';
import { Grid } from '@mui/material';
import DrugAutocomplete from '../components/Drugs/DrugAutocomplete';
import DrugInteractionChecker from '../components/Drugs/DrugInteractionChecker';
import MedicationTable from '../components/Medications/MedicationHistory';

function Medications() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3} pt={8}>
			<Grid item xs={12} md={6}>
				<DrugAutocomplete />
			</Grid>
			<Grid item xs={12} md={6}>
				<DrugInteractionChecker />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationTable />
			</Grid>
		</Grid>
	);
}

export default Medications;