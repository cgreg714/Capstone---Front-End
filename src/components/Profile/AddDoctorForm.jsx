import React, { useRef, useContext, useState } from 'react';
import { Card, Button, TextField, Box, CardContent, Grid, Typography } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';
import { useTheme } from '@mui/material/styles';
function AddDoctorForm() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const phoneNumberRef = useRef();
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [phoneNumber, setPhoneNumber] = useState('');

	const { createDoctor } = useContext(ProfileContext);
	const theme = useTheme();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		const phoneNumber = phoneNumberRef.current.value;

		if (!phoneNumberPattern.test(phoneNumber)) {
			setSnackbarMessage('Invalid phone number format. Please use (123) 456-7890 format');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			return;
		}

		const doctor = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		try {
			await createDoctor(doctor);
			setPhoneNumber('');

			setSnackbarMessage('Doctor added successfully');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarMessage('An error occurred while adding the doctor');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}

		firstNameRef.current.value = '';
		lastNameRef.current.value = '';
		phoneNumberRef.current.value = '';
	};

	return (
		<Card sx={{ backgroundColor: theme.palette.secondary.main }}>
			<Typography sx={{ textAlign: 'center', mt: 2 }}>Add Doctor</Typography>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField inputRef={firstNameRef} label="First Name" required fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField inputRef={lastNameRef} label="Last Name" required fullWidth />
						</Grid>
						<Grid item xs={12}>
							<PhoneNumberInput ref={phoneNumberRef} value={phoneNumber} onChange={setPhoneNumber} />
						</Grid>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								type="submit"
								variant="contained"
								sx={{
									width: '50%',
									color: 'black',
									fontWeight: 'bolder',
									fontFamily: 'Comfortaa',
									borderRadius: 20,
									backgroundColor: (theme) => theme.palette.fifth.main,
									boxShadow: (theme) => `0 5px 5px ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
									zIndex: 1,
									'&:hover': {
										backgroundColor: (theme) => theme.palette.fifth.main,
										boxShadow: (theme) => `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,

									},
								}}
							>
								Add Doctor
							</Button>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
}

export default AddDoctorForm;
