import React from 'react';
import { Grid } from '@mui/material';
import MedIndex from '../components/Medications/MedIndex/MedIndex';

function Medications() {

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<MedIndex />
			</Grid>
		</Grid>
	);
}

export default Medications;