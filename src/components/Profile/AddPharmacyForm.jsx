import React, { useRef, useContext, useState } from 'react';
import { Card, TextField, Box, CardContent, Grid, Typography, Autocomplete } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';
import { states } from '../../helpers/states';
import { useTheme } from '@mui/material/styles';
import { Styled3DButtonGreen } from '../../styles/mainLayoutStyles';
function AddPharmacyForm() {
	const nameRef = useRef();
	const streetRef = useRef();
	const cityRef = useRef();
	const zipRef = useRef();
	const phoneNumberRef = useRef();
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [state, setState] = useState('');

	const { createPharmacy } = useContext(ProfileContext);
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

		const pharmacy = {
			name: nameRef.current.value,
			address: {
				street: streetRef.current.value,
				city: cityRef.current.value,
				state: state,
				zip: zipRef.current.value,
			},
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
		streetRef.current.value = '';
		cityRef.current.value = '';
		setState('');
		zipRef.current.value = '';
	};

	return (
		<Card
			sx={{
				maxWidth: 550,
				backgroundColor: theme.palette.secondary.main,
				boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
				borderRadius: 4,
			}}
		>
			<Typography sx={{ textAlign: 'center', mt: 2 }}>Add Pharmacy</Typography>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								inputRef={nameRef}
								label="Name"
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
						<Grid item xs={12}>
							<TextField
								inputRef={streetRef}
								label="Street"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								inputRef={cityRef}
								label="City"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<Autocomplete
								id="state-select"
								options={states}
								autoHighlight
								autoSelect
								sx={{
									'& .MuiAutocomplete-root': {
										backgroundColor: '#f9c47f',
									},
									'& .MuiInputBase-root': {
										backgroundColor: '#f9c47f',
									},
									'& .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
										backgroundColor: '#f9c47f',
									},
									'& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
										backgroundColor: '#f9c47f',
									},
									'& .MuiAutocomplete-listbox': {
										backgroundColor: '#f9c47f',
									},
									'& .MuiAutocomplete-option': {
										backgroundColor: '#f9c47f',
									},
								}}
								getOptionLabel={(option) => option.name}
								onInputChange={(event, newValue) => {
									setState(newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="State"
									/>
								)}
							/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								inputRef={zipRef}
								label="Zip"
								required
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
								inputProps={{
									inputMode: 'numeric',
									maxLength: 5,
								}}
								onKeyDown={(event) => {
									const validKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
									if (!/[0-9]/.test(event.key) && !validKeys.includes(event.key)) {
										event.preventDefault();
									}
								}}
							/>
						</Grid>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Styled3DButtonGreen type="submit" variant="contained" color="secondary">
								Add Pharmacy
							</Styled3DButtonGreen>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
}

export default AddPharmacyForm;
