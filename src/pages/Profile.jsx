import React from 'react';
import { Grid } from '@mui/material';
import AddProfileForm from '../components/Profile/AddProfileForm';

function Profile() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<AddProfileForm />
			</Grid>
		</Grid>
	);
}

export default Profile;