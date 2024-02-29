import React, { useRef, useContext, useState } from 'react';
import { Accordion, AccordionSummary, Button, TextField, Box, CardContent, Grid, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';
import { useTheme } from '@mui/material/styles';

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
		<Accordion disableGutters sx={{ maxWidth: 600, mt: 2, mb: 1, backgroundColor: theme.palette.accordionBackground }}>
			<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
				<Typography>Add Buddy</Typography>
			</AccordionSummary>
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
							<TextField inputRef={relationRef} label="Relation" required fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField inputRef={emailRef} label="Email" required fullWidth />
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
									zIndex: 1,
									'&:hover': {
										backgroundColor: (theme) => theme.palette.hoverGrey,
									},
								}}
								color="secondary"
							>
								Add Buddy
							</Button>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Accordion>
	);
}

export default AddABuddyForm;
