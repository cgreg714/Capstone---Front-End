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
} from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import AddDrugAutocomplete from './AddDrugAutocomplete';
import DrugAutocomplete from '../Drugs/DrugAutocomplete';

const AddMedicationForm = () => {
	const { createMedication } = useContext(MedicationContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const [resetAutocomplete, setResetAutocomplete] = useState(false);
	const [selectedDrugId, setSelectedDrugId] = useState(null);
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

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

	const resetForm = () => {
		setSelectedDrugId(null);
		setName('');
		setDescription('');
		setUnitOfMeasurement('');
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

		let utcTime = '';
		if (time) {
			const date = new Date(`1970-01-01T${time}:00`);
			utcTime = date.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }).substr(0, 5);
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
					time: utcTime,
				},
			});

			setSnackbarMessage('Medication created successfully.');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);

			resetForm();
		} catch (error) {
			setSnackbarMessage('Error creating medication.');
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
				<Select
					value={unitOfMeasurement}
					onChange={(e) => setUnitOfMeasurement(e.target.value)}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value="" disabled>
						Unit of Measurement
					</MenuItem>
					{['kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'].map((unit) => (
						<MenuItem value={unit} key={unit}>
							{unit}
						</MenuItem>
					))}
				</Select>
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
				<TextField
					margin="normal"
					required
					fullWidth
					id="prescriber"
					label="Prescriber"
					value={prescriber}
					onChange={(e) => setPrescriber(e.target.value)}
				/>
				<DrugAutocomplete setSelectedDrugId={setSelectedDrugId} reset={resetAutocomplete} />
				<FormControl component="fieldset" sx={{ mt: 3 }}>
					<FormLabel component="legend">Frequency</FormLabel>
					<RadioGroup value={frequency} onChange={handleFrequencyChange}>
						<FormControlLabel value="none" control={<Radio />} label="None" />
						<FormControlLabel value="once" control={<Radio />} label="One Time" />
						<FormControlLabel value="daily" control={<Radio />} label="Daily" />
						<FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
						<FormControlLabel value="biWeekly" control={<Radio />} label="Bi-Weekly" />
						<FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
					</RadioGroup>
				</FormControl>
				<FormControl component="fieldset" sx={{ mt: 3 }}>
					<FormLabel component="legend">Day of the Week</FormLabel>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={selectAllDays}
									onChange={handleSelectAllDaysChange}
									name="selectAllDays"
								/>
							}
							label="Select All"
						/>
						{Object.keys(dayOfTheWeek).map((day) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={dayOfTheWeek[day]}
										onChange={handleDayOfTheWeekChange}
										name={day}
									/>
								}
								label={day.charAt(0).toUpperCase() + day.slice(1)}
								key={day}
							/>
						))}
					</FormGroup>
				</FormControl>
				<FormControl component="fieldset" sx={{ mt: 3 }}>
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
				</FormControl>
				<FormControl component="fieldset" sx={{ mt: 3 }}>
					<FormLabel component="legend">Time</FormLabel>
					<TextField
						id="time"
						type="time"
						value={time}
						onChange={handleTimeChange}
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300,
						}}
					/>
				</FormControl>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					Add Medication
				</Button>
			</Box>
		</Card>
	);
};

export default AddMedicationForm;
