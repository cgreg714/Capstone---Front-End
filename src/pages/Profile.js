import React from 'react';
import { Grid } from '@mui/material';
import MedicationSubmitForm from '../components/medicationSubmitForm';

function Profile() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<MedicationSubmitForm />
			</Grid>
		</Grid>
	);
}

export default Profile;