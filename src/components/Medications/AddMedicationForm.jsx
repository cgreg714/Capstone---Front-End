import React, { useContext, useState } from 'react';
import {
	Button,
	TextField,
	Card,
	Box,
	FormControl,
	FormLabel,
	FormControlLabel,
	Checkbox,
	RadioGroup,
	Radio,
	Grid,
	Autocomplete,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import DrugSearchByNameAutocomplete from '../Drugs/DrugNameSearchAutocomplete';
import { DrugContext } from '../../contexts/DrugContext';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Styled3DButtonGreen } from '../../styles/mainLayoutStyles';

const AddMedicationForm = () => {
	const { createMedication } = useContext(MedicationContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const { selectedDrugId, setSelectedDrugId } = useContext(DrugContext);
	const { doctors, pharmacies } = useContext(ProfileContext);
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [selectedPharmacy, setSelectedPharmacy] = useState(null);

	const [resetAutocomplete, setResetAutocomplete] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
	const [dose, setDose] = useState('');
	const [quantity, setQuantity] = useState('');
	const [timeOfDay, setTimeOfDay] = useState({
		morning: false,
		noon: false,
		evening: false,
		bedtime: false,
	});
	const [dayOfTheWeek, setDayOfTheWeek] = useState({
		sunday: false,
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
	});
	const [selectAllDays, setSelectAllDays] = useState(false);
	const [frequency, setFrequency] = useState('');

	const [everyXHours, setEveryXHours] = useState('');
	const [customFrequency, setCustomFrequency] = useState('');

	const [time, setTime] = useState('');
	const units = ['kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'];

	const [openDialog, setOpenDialog] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

	const resetForm = () => {
		setSelectedDrugId(null);
		setName('');
		setDescription('');
		setUnitOfMeasurement('mg');
		setDose('');
		setQuantity('');
		setResetAutocomplete(true);
		setTimeOfDay({
			morning: false,
			noon: false,
			evening: false,
			bedtime: false,
		});
		setDayOfTheWeek({
			sunday: false,
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
		});
		setSelectAllDays(false);
		setFrequency('');
		setTime('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		// Convert the local time to UTC
		const localTime = new Date(`1970-01-01T${time}:00`);
		const isoTime = localTime.toISOString();

		if (!name || !quantity || !dose || !unitOfMeasurement || !selectedDrugId) {
			setOpenDialog(true);
			return;
		}

		try {
			await createMedication({
				name,
				description,
				unitOfMeasurement,
				dose,
				quantity,
				drug: selectedDrugId,
				doctor: selectedDoctor,
				pharmacy: selectedPharmacy,
				frequency: {
					...(frequency === 'customFrequency' ? { customFrequency } : { [frequency]: true }),
					dayOfTheWeek,
					timeOfDay,
					time: isoTime,
				},
			});

			setSnackbarMessage('Medication created successfully.');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);

			resetForm();
			// handleClose();
		} catch (error) {
			setSnackbarMessage(`Error creating medication. ${error.message}`);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDayOfTheWeekChange = (event) => {
		setDayOfTheWeek({ ...dayOfTheWeek, [event.target.name]: event.target.checked });
	};

	const handleFrequencyChange = (event) => {
		if (frequency === 'everyXHours') {
			setEveryXHours('');
		}
		if (frequency === 'customFrequency') {
			setCustomFrequency('');
		}
		setFrequency(event.target.value);
	};

	const handleSelectAllDaysChange = (event) => {
		setSelectAllDays(event.target.checked);
		setDayOfTheWeek({
			sunday: event.target.checked,
			monday: event.target.checked,
			tuesday: event.target.checked,
			wednesday: event.target.checked,
			thursday: event.target.checked,
			friday: event.target.checked,
			saturday: event.target.checked,
		});
	};

	return (
		<Card sx={{ p: 2 }}>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							margin="normal"
							fullWidth
							id="description"
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Box mt={2}>
							<DrugSearchByNameAutocomplete reset={resetAutocomplete} />
						</Box>
					</Grid>
					<Grid item xs={3}>
						<TextField
							margin="normal"
							fullWidth
							id="quantity"
							label="Quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							type="number"
							onKeyDown={(event) => {
								if (
									!/[0-9]/.test(event.key) &&
									!['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
								) {
									event.preventDefault();
								}
							}}
							inputProps={{ min: '0', step: '1' }}
						/>
					</Grid>

					<Grid item xs={3}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="dose"
							label="Dose"
							value={dose}
							onChange={(e) => setDose(e.target.value)}
							type="number"
							onKeyDown={(event) => {
								if (
									!/[0-9]/.test(event.key) &&
									!['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
								) {
									event.preventDefault();
								}
							}}
							inputProps={{ min: '0', step: '1' }}
						/>
					</Grid>
					<Grid item xs={3}>
						<Autocomplete
							value={unitOfMeasurement || 'mg'}
							onChange={(event, newValue) => {
								setUnitOfMeasurement(newValue);
							}}
							inputValue={unitOfMeasurement || ''}
							onInputChange={(event, newInputValue) => {
								setUnitOfMeasurement(newInputValue);
							}}
							options={units}
							isOptionEqualToValue={(option, value) => option === value}
							renderInput={(params) => (
								<TextField {...params} label="Unit of Measurement" margin="normal" />
							)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2} alignItems="center" sx={{ mt: 0.25 }}>
					<Grid item xs={4}>
						<FormControl component="fieldset" sx={{ ml: 2 }}>
							<TextField
								id="time"
								type="time"
								value={time}
								label="Time"
								sx={{ minWidth: 125 }}
								onChange={handleTimeChange}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							options={doctors}
							getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
							value={selectedDoctor}
							onChange={(event, newValue) => setSelectedDoctor(newValue)}
							renderInput={(params) => <TextField {...params} label="Doctor" />}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							options={pharmacies}
							getOptionLabel={(option) => option.name}
							value={selectedPharmacy}
							onChange={(event, newValue) => setSelectedPharmacy(newValue)}
							renderInput={(params) => <TextField {...params} label="Pharmacy" />}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2} mt={3}>
					<FormControl component="fieldset" sx={{ ml: 2 }}>
						<FormLabel component="legend" sx={{ fontSize: '1.5rem', mb: -2 }}>
							Frequency
						</FormLabel>
						<RadioGroup value={frequency} onChange={handleFrequencyChange} row>
							<FormControlLabel value="once" control={<Radio />} label="One Time" />
							<FormControlLabel value="daily" control={<Radio />} label="Daily" />
							<FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
							<FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
							<FormControlLabel value="everyXHours" control={<Radio />} label="Every X hours" />
							<TextField
								margin="normal"
								id="everyXHours"
								label="X"
								sx={{ ml: 1, mr: 2, width: 75 }}
								value={everyXHours}
								onChange={(e) => setEveryXHours(e.target.value)}
								type="number"
								inputProps={{ min: '0', step: '1' }}
								disabled={frequency !== 'everyXHours'}
								// size="small"
							/>
							<FormControlLabel value="customFrequency" control={<Radio />} label="Custom" />
							<TextField
								margin="normal"
								id="customFrequency"
								sx={{ ml: 1, width: 125 }}
								label="Custom"
								value={customFrequency}
								onChange={(e) => setCustomFrequency(e.target.value)}
								disabled={frequency !== 'customFrequency'}
							/>
						</RadioGroup>
					</FormControl>
					<FormControl component="fieldset" sx={{ mt: 3, ml: 2 }}>
						<FormLabel component="legend" sx={{ fontSize: '1.5rem' }}>
							Day of the Week
							<FormControlLabel
								control={
									<Checkbox
										checked={selectAllDays}
										onChange={handleSelectAllDaysChange}
										name="selectAllDays"
									/>
								}
								label="Select All"
								sx={{ ml: 2 }}
							/>
						</FormLabel>
						<Grid container spacing={2}>
							{['monday', 'tuesday', 'wednesday', 'thursday'].map((day) => (
								<Grid item xs={3} key={day}>
									<FormControlLabel
										control={
											<Checkbox
												checked={dayOfTheWeek[day]}
												onChange={handleDayOfTheWeekChange}
												name={day}
											/>
										}
										label={day.charAt(0).toUpperCase() + day.slice(1)}
									/>
								</Grid>
							))}
						</Grid>
						<Grid container spacing={2}>
							{['friday', 'saturday', 'sunday'].map((day) => (
								<Grid item xs={3} key={day}>
									<FormControlLabel
										control={
											<Checkbox
												checked={dayOfTheWeek[day]}
												onChange={handleDayOfTheWeekChange}
												name={day}
											/>
										}
										label={day.charAt(0).toUpperCase() + day.slice(1)}
									/>
								</Grid>
							))}
						</Grid>
					</FormControl>
				</Grid>
				{/* <FormControl component="fieldset" sx={{ mt: 3 }}>
					<FormLabel component="legend">Time of Day</FormLabel>
					<FormGroup>
						{Object.keys(timeOfDay).map((time) => (
							<FormControlLabel
								control={
									<Checkbox checked={timeOfDay[time]} onChange={handleTimeOfDayChange} name={time} />
								}
								label={time.charAt(0).toUpperCase() + time.slice(1)}
								key={time}
							/>
						))}
					</FormGroup>
				</FormControl> */}
				<Box display="flex" justifyContent="center" mt={2}>
					<Styled3DButtonGreen
						type="submit"
						color="fifth"
						variant="contained"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Adding...' : 'Add Medication'}
					</Styled3DButtonGreen>
				</Box>
			</Box>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>{'Missing required fields'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill all the required fields: Name, Quantity, Dose, Unit of Measurement, and Drug.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default AddMedicationForm;
