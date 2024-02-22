import React from 'react';
import { Grid } from '@mui/material';
import ProfileCards from '../components/Profile/Card/ProfileCard';
import AddABuddyForm from '../components/Profile/AddABuddyForm';
import AddDoctorForm from '../components/Profile/AddDoctorForm';
import AddProfileForm from '../components/Profile/AddProfileForm';
import AddPharmacyForm from '../components/Profile/AddPharmacyForm';

function Profile() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ProfileCards />
			</Grid>
			<Grid item xs={12}>
				<AddProfileForm />
			</Grid>
			<Grid item xs={12}>
				<AddABuddyForm />
			</Grid>
			<Grid item xs={12}>
				<AddDoctorForm />
			</Grid>
			<Grid item xs={12}>
				<AddPharmacyForm />
			</Grid>
		</Grid>
	);
}

export default Profile;