import React from 'react';
import { Grid } from '@mui/material';
import DrugInteractionChecker from '../components/Drugs/DrugInteractionChecker';
import MedicationAutocomplete from '../components/Medications/MedAutocomplete';

function Drugs() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3} pt={8}>
			<Grid item xs={12} md={6}>
				<MedicationAutocomplete />
			</Grid>
			<Grid item xs={12} md={6}>
				<DrugInteractionChecker />
			</Grid>
		</Grid>
	);
}

export default Drugs;