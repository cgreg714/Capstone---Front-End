import React, { useRef, useContext, useState } from 'react';
import { Card, TextField, Box, CardContent, Grid, Typography } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';
import { useTheme } from '@mui/material/styles';
import { Styled3DButtonGreen } from '../../styles/mainLayoutStyles';

function AddABuddyForm() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const relationRef = useRef();
	const emailRef = useRef();
	const phoneNumberRef = useRef();
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [phoneNumber, setPhoneNumber] = useState('');

	const { createABuddy } = useContext(ProfileContext);
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

		const aBuddy = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			relation: relationRef.current.value,
			email: emailRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		try {
			await createABuddy(aBuddy);
			setPhoneNumber('');

			setSnackbarMessage('Buddy added successfully');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarMessage('An error occurred while adding the buddy');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}

		firstNameRef.current.value = '';
		lastNameRef.current.value = '';
		relationRef.current.value = '';
		emailRef.current.value = '';
	};

	return (
		<Card
			sx={{
				maxWidth: 500,
				backgroundColor: theme.palette.secondary.main,
				boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
				borderRadius: 4,
			}}
		>
			<Typography sx={{ textAlign: 'center', mt: 2 }}>Add Emergency Contact</Typography>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<TextField
								inputRef={firstNameRef}
								label="First Name"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								inputRef={lastNameRef}
								label="Last Name"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								inputRef={relationRef}
								label="Relation"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								inputRef={emailRef}
								label="Email"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<PhoneNumberInput
								ref={phoneNumberRef}
								value={phoneNumber}
								onChange={setPhoneNumber}
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Styled3DButtonGreen type="submit" variant="contained" color="secondary" sx={{ width: '250px'}}>
								Add Emergency Contact
							</Styled3DButtonGreen>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
}

export default AddABuddyForm;
