import React from 'react';
import { Grid } from '@mui/material';
import MedicationSubmitForm from '../components/medicationSubmitForm';
import MedicationSchedule from '../components/medicationSchedule';
import LoginComponent from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import LogoutButton from '../components/Auth/Logout';

function Dashboard() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<MedicationSubmitForm />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationSchedule />
			</Grid>
			<Grid item xs={12} md={6}>
				<Signup />
			</Grid>
			<Grid item xs={12} md={6}>
				<LoginComponent />
			</Grid>
			<Grid item xs={12} md={6}>
				<LogoutButton />
			</Grid>
		</Grid>
	);
}

export default Dashboard;