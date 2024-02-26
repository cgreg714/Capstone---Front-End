import React, { useRef, useContext } from 'react';
import { Button, TextField, Box, Card, CardContent, Grid } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';

function AddDoctorForm() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const phoneNumberRef = useRef();
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const { createDoctor } = useContext(ProfileContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const doctor = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		try {
			await createDoctor(doctor);

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
		<Card style={{ maxWidth: '600px' }}>
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
							<TextField inputRef={phoneNumberRef} label="Phone Number" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary" fullWidth>
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
