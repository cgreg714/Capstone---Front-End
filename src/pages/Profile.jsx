import React from 'react';
import { Grid, Card, CardContent, Box } from '@mui/material';
import ProfileCard from '../components/Profile/Card/ProfileCard';
import ABuddyCard from '../components/Profile/Card/AbuddyCard';
import DoctorCard from '../components/Profile/Card/DoctorCard';
import PharmacyCard from '../components/Profile/Card/PharmacyCard.jsx';
import AddProfileForm from '../components/Profile/AddProfileForm.jsx';
import AddDoctorForm from '../components/Profile/AddDoctorForm.jsx';
import AddABuddyForm from '../components/Profile/AddABuddyForm.jsx';
import AddPharmacyForm from '../components/Profile/AddPharmacyForm.jsx';

function PharmacyCardWrapper() {
	return (
		<Card>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="center">
							<AddPharmacyForm />
						</Box>
					</Grid>
					<PharmacyCard />
				</Grid>
			</CardContent>
		</Card>
	);
}

function AbuddyCardWrapper() {
	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="center">
							<AddABuddyForm />
						</Box>
					</Grid>
					<ABuddyCard />
				</Grid>
			</CardContent>
		</Card>
	);
}

function DoctorCardWrapper() {
	return (
		<Card>
			<CardContent>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center">
						<AddDoctorForm />
					</Box>
				</Grid>
				<DoctorCard />
			</CardContent>
		</Card>
	);
}

function Profile() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ProfileCard />
			</Grid>
			<Grid item xs={12}>
				<PharmacyCardWrapper />
			</Grid>
			<Grid item xs={12}>
				<DoctorCardWrapper />
			</Grid>
			<Grid item xs={12}>
				<AbuddyCardWrapper />
			</Grid>
			<Grid item xs={12}>
				<AddProfileForm />
			</Grid>
		</Grid>
	);
}

export default Profile;
