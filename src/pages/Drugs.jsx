import React from 'react';
import { Grid } from '@mui/material';
import DrugInteractionChecker from '../components/Drugs/DrugInteractionChecker';
import MedDrugInteractionChecker from '../components/Drugs/MedDrugInteractionChecker';
function Drugs() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<MedDrugInteractionChecker />
			</Grid>
			<Grid item xs={12} md={6}>
				<DrugInteractionChecker />
			</Grid>
		</Grid>
	);
}

export default Drugs;