import React from 'react';
import { Grid } from '@mui/material';
import ProfileCards from '../components/Profile/Card/ProfileCard';

function Profile() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ProfileCards />
			</Grid>
		</Grid>
	);
}

export default Profile;