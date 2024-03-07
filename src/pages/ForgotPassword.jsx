import React from 'react';
import { Grid } from '@mui/material';
import ForgotPassword from '../components/Auth/ForgotPassword/ForgotPassword';

function ForgotPasswordPage() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<ForgotPassword />
			</Grid>
		</Grid>
	);
}

export default ForgotPasswordPage;