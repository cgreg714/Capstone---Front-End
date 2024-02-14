import React from 'react';
import { Grid } from '@mui/material';
import LoginComponent from '../components/Auth/Login';

function LoginPage() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<LoginComponent />
			</Grid>
		</Grid>
	);
}

export default LoginPage;