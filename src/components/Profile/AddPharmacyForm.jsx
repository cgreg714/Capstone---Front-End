import React, { useRef, useContext, useState } from 'react';
import {
	Accordion,
	AccordionSummary,
	Button,
	TextField,
	Box,
	CardContent,
	Grid,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Autocomplete,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import PhoneNumberInput from '../Profile/PhoneNumberInput';
import { states } from '../../helpers/states';

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

	const handleStateChange = (event) => {
		setState(event.target.value);
	};

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
							<TextField inputRef={streetRef} label="Street" required fullWidth />
						</Grid>
						<Grid item xs={5}>
							<TextField inputRef={cityRef} label="City" required fullWidth />
						</Grid>
						<Grid item xs={5}>
							<Autocomplete
								id="state-select"
								options={states}
								autoHighlight
								autoSelect
								getOptionLabel={(option) => option.name}
								onInputChange={(event, newValue) => {
									setState(newValue);
								}}
								renderInput={(params) => <TextField {...params} label="State" />}
							/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								inputRef={zipRef}
								label="Zip Code"
								required
								fullWidth
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
