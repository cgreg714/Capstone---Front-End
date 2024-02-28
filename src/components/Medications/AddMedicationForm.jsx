import React, { useContext, useState } from 'react';
import {
	Button,
	TextField,
	Card,
	Box,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	RadioGroup,
	Radio,
	Select,
	MenuItem,
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

const AddMedicationForm = ({ handleClose }) => {
	const { createMedication } = useContext(MedicationContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const { selectedDrugId, setSelectedDrugId } = useContext(DrugContext);

	const [resetAutocomplete, setResetAutocomplete] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
	const [dose, setDose] = useState('');
	const [quantity, setQuantity] = useState('');
	const [prescriber, setPrescriber] = useState('');
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

	const [time, setTime] = useState('');
	const units = ['kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'];

	const [openDialog, setOpenDialog] = useState(false);

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
		setPrescriber('');
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

		// Convert the local time to UTC
		const localTime = new Date(`1970-01-01T${time}:00`);
		const isoTime = localTime.toISOString();

		if (!name || !quantity || !dose || !unitOfMeasurement || !prescriber || !selectedDrugId) {
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
				prescriber,
				drug: selectedDrugId,
				frequency: {
					[frequency]: true,
					dayOfTheWeek,
					timeOfDay,
					time: isoTime,
				},
			});

			setSnackbarMessage('Medication created successfully.');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);

			resetForm();
			handleClose();
		} catch (error) {
			setSnackbarMessage(`Error creating medication. ${error.message}`);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const handleTimeOfDayChange = (event) => {
		setTimeOfDay({ ...timeOfDay, [event.target.name]: event.target.checked });
	};

	const handleDayOfTheWeekChange = (event) => {
		setDayOfTheWeek({ ...dayOfTheWeek, [event.target.name]: event.target.checked });
	};

	const handleFrequencyChange = (event) => {
		setFrequency((prevFrequency) => (prevFrequency === event.target.value ? '' : event.target.value));
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
		<Card variant="outlined" sx={{ mt: 1, p: 2 }}>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="name"
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					margin="normal"
					fullWidth
					id="description"
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							margin="normal"
							required
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

					<Grid item xs={4}>
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
					<Grid item xs={4}>
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
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={6}>
						<DrugSearchByNameAutocomplete reset={resetAutocomplete} />
					</Grid>
					<Grid item xs={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="prescriber"
							label="Prescriber"
							value={prescriber}
							onChange={(e) => setPrescriber(e.target.value)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<FormControl component="fieldset" sx={{ mt: 3, ml: 2 }}>
						<FormLabel component="legend" sx={{ fontSize: '1.5rem' }}>
							Frequency
						</FormLabel>
						<RadioGroup value={frequency} onChange={handleFrequencyChange} row>
							<FormControlLabel value="none" control={<Radio />} label="None" />
							<FormControlLabel value="once" control={<Radio />} label="One Time" />
							<FormControlLabel value="daily" control={<Radio />} label="Daily" />
							<FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
							<FormControlLabel value="biWeekly" control={<Radio />} label="Bi-Weekly" />
							<FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
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

					<Grid item xs={2}>
						<FormControl component="fieldset" sx={{ mt: 1, ml: 2 }}>
							<FormLabel component="legend">Specific Time</FormLabel>
							<TextField
								id="time"
								type="time"
								value={time}
								sx={{ minWidth: 120 }}
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
				<Box display="flex" justifyContent="center">
					<Button
						type="submit"
						color="success"
						variant="contained"
						sx={{ width: '75%', mt: 3, mb: 2, borderRadius: 5 }}
					>
						Add Medication
					</Button>
				</Box>
			</Box>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>{'Missing required fields'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill all the required fields: Name, Quantity, Dose, Unit of Measurement, Drug, and
						Prescriber.
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
