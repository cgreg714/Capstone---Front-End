import React from 'react';
import { Grid } from '@mui/material';
import SignupComponent from '../components/Auth/Signup';
import Signup from '../components/Auth/Signup/Signup';

function SignupPage() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<Signup />
			</Grid>
		</Grid>
	);
}

export default SignupPage;