import React from 'react';
import { Grid } from '@mui/material';
import PasswordReset from '../components/Auth/ForgotPassword/ResetPassword';

function PasswordResetPage() {
	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12}>
				<PasswordReset />
			</Grid>
		</Grid>
	);
}

export default PasswordResetPage;