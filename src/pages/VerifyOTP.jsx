import React from 'react';
import { Grid } from '@mui/material';
import VerifyOTP from '../components/Auth/ForgotPassword/VerifyOTP';

function VerifyOTPPage() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<VerifyOTP />
			</Grid>
		</Grid>
	);
}

export default VerifyOTPPage;