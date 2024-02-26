import React, { useState, useRef, useContext } from 'react';
import { sendOTP } from '../../../api/authAPI';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const emailRef = useRef();
    const [message, setMessage] = useState('');
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendOTP(emailRef.current.value);
            setMessage(response.message);
            setOpenSnackbar(true);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.message);
            navigate('/verify-otp');
        } catch (error) {
            setMessage(error.message);
            setOpenSnackbar(true);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.message);
        }
    };

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Typography variant="h4" gutterBottom>
				Forgot Your Password?
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: 300,
					mt: 1,
				}}
			>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					inputRef={emailRef}
				/>
				<Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
					Send One-Time Passcode
				</Button>
			</Box>
			{message && <Typography variant="body1">{message}</Typography>}
		</Container>
	);
}

export default ForgotPassword;