import React from 'react';
import { Grid } from '@mui/material';
import Login from '../components/Auth/Login/Login';

function LoginPage() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<Login />
			</Grid>
		</Grid>
	);
}

export default LoginPage;