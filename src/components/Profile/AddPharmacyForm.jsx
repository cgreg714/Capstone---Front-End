import React, { useRef, useContext, useState } from 'react';
import { Accordion, AccordionSummary, Button, TextField, Box, CardContent, Grid, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';

function AddPharmacyForm() {
	const nameRef = useRef();
	const addressRef = useRef();
	const phoneNumberRef = useRef();
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [phoneNumber, setPhoneNumber] = useState('');

	const { createPharmacy } = useContext(ProfileContext);

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

		const pharmacy = {
			name: nameRef.current.value,
			address: addressRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		try {
			await createPharmacy(pharmacy);
			setPhoneNumber('');

			setSnackbarMessage('Pharmacy added successfully');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarMessage('An error occurred while adding the pharmacy');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}

		nameRef.current.value = '';
		addressRef.current.value = '';
	};

	return (
		<Accordion disableGutters sx={{ maxWidth: 600, mt: 2, mb: 1 }}>
			<AccordionSummary expandIcon={<ArrowDropDownIcon />}>
				<Typography>Add Pharmacy</Typography>
			</AccordionSummary>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField inputRef={nameRef} label="Name" required fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField inputRef={addressRef} label="Address" required fullWidth />
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
								Add Pharmacy
							</Button>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Accordion>
	);
}

export default AddPharmacyForm;
