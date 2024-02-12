import React from 'react';
import { Grid } from '@mui/material';
import Signup from '../components/Auth/Signup';

function SignupPage() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<Signup />
			</Grid>
		</Grid>
	);
}

export default SignupPage;