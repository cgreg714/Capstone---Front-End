import React from 'react';
import { Grid } from '@mui/material';
import AddABuddyForm from '../components/Profile/AddABuddyForm';
import AddDoctorForm from '../components/Profile/AddDoctorForm';

function Settings() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<AddABuddyForm />
			</Grid>
			<Grid item xs={12}>
				<AddDoctorForm />
			</Grid>
		</Grid>
	);
}

export default Settings;