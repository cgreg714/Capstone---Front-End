import React from 'react';
import { Grid } from '@mui/material';
import ProfileCard from '../components/Profile/Card/ProfileCard';
import ABuddyCard from '../components/Profile/Card/AbuddyCard';
import DoctorCard from '../components/Profile/Card/DoctorCard';
import PharmacyCard from '../components/Profile/Card/PharmacyCard.jsx';
import AddProfileForm from '../components/Profile/AddProfileForm.jsx';
import AddDoctorForm from '../components/Profile/AddDoctorForm.jsx';
import AddABuddyForm from '../components/Profile/AddABuddyForm.jsx';
import AddPharmacyForm from '../components/Profile/AddPharmacyForm.jsx';

function Profile() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ProfileCard />
			</Grid>
			<Grid item xs={12}>
				<PharmacyCard />
			</Grid>
			<Grid item xs={12}>
				<DoctorCard />
			</Grid>
			<Grid item xs={12}>
				<ABuddyCard />
			</Grid>
			<Grid item xs={12}>
				<AddProfileForm />
			</Grid>
			<Grid item xs={12}>
				<AddDoctorForm />
			</Grid>
			<Grid item xs={12}>
				<AddABuddyForm />
			</Grid>
			<Grid item xs={12}>
				<AddPharmacyForm />
			</Grid>

		</Grid>
	);
}

export default Profile;
