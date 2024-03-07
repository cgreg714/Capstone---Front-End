import React from 'react';
import { Grid } from '@mui/material';
import ProfileSelection from '../components/Profile/ProfileSelection';

function ProfileSelectionPage() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ProfileSelection />
			</Grid>
		</Grid>
	);
}

export default ProfileSelectionPage;