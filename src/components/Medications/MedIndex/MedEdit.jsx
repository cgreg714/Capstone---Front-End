import React, { useContext, useState, useEffect } from 'react';
import { MedicationContext } from '../../../contexts/MedicationContext';
import { TextField, Button, Checkbox, FormControlLabel, Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DrugSearchByNameAutocomplete from '../../Drugs/DrugNameSearchAutocomplete';
import { DrugContext } from '../../../contexts/DrugContext';
import { Styled3DButtonTeal, Styled3DButtonRed } from '../../../styles/mainLayoutStyles';

function EditMedications() {
	const { medications, updateMedication, deleteMedication } = useContext(MedicationContext);
	const [editedMedications, setEditedMedications] = useState([]);
	const theme = useTheme();
	const { setSelectedDrugId } = useContext(DrugContext);

	useEffect(() => {
		setEditedMedications(medications);
	}, [medications]);

	const handleInputChange = (index, event) => {
		const values = [...editedMedications];
		if (event.target.name === 'dateAdded') {
			const newDate = new Date(event.target.value);
			if (isNaN(newDate)) {
				values[index][event.target.name] = new Date().toISOString().split('T')[0];
			} else {
				values[index][event.target.name] = event.target.value;
			}
		} else if (event.target.name === 'customFrequency' || event.target.name === 'everyXHours') {
			values[index]['frequency'][event.target.name] = event.target.value;
		} else {
			values[index][event.target.name] = event.target.value;
		}
		setEditedMedications(values);
	};

	const handleCheckboxChange = (index, field, subfield) => {
		const values = [...editedMedications];
		const fieldParts = field.split('.');
		if (fieldParts.length === 2) {
			values[index][fieldParts[0]][fieldParts[1]][subfield] =
				!values[index][fieldParts[0]][fieldParts[1]][subfield];
		} else {
			values[index][field][subfield] = !values[index][field][subfield];
		}
		setEditedMedications(values);
	};

	const handleDrugSelected = (index, newDrugId) => {
		const values = [...editedMedications];
		values[index].associatedDrug._id = newDrugId;
		setEditedMedications(values);
	};

	const handleSubmit = (index, event) => {
		event.preventDefault();
		let medicationToUpdate = { ...editedMedications[index] };
		if (medicationToUpdate.associatedDrug && medicationToUpdate.associatedDrug._id) {
			medicationToUpdate.associatedDrug = medicationToUpdate.associatedDrug._id;
		}
		setSelectedDrugId(medicationToUpdate.associatedDrug);
		updateMedication(medications[index]._id, medicationToUpdate);
	};

	const handleDelete = (index) => {
		deleteMedication(medications[index]._id);
	};

	const handleEverydayChange = (index) => {
		const values = [...editedMedications];
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		const newValue = !days.some((day) => values[index].frequency.dayOfTheWeek[day]);
		days.forEach((day) => {
			values[index].frequency.dayOfTheWeek[day] = newValue;
		});
		setEditedMedications(values);
	};

	const handleTimeChange = (index, event) => {
		const values = [...editedMedications];
		if (event.target.value === '') {
			values[index].frequency.time = '';
		} else {
			const timeParts = event.target.value.split(':');
			if (timeParts.length === 2 && !isNaN(timeParts[0]) && !isNaN(timeParts[1])) {
				const hours = parseInt(timeParts[0]);
				const minutes = parseInt(timeParts[1]);
				const time = new Date();
				time.setHours(hours);
				time.setMinutes(minutes);
				values[index].frequency.time = time.toISOString();
			}
		}
		setEditedMedications(values);
	};

	return (
		<>
			{editedMedications.map((medication, index) => (
				<Box
					key={medication._id}
					mb={4}
					p={2}
					border={1}
					borderRadius={4}
					borderColor="grey.500"
					sx={{
						m: 4,
						minWidth: 275,
						boxShadow: theme.palette.mode === 'dark' ? '0 6px 10px white' : '0 6px 10px black',
					}}
				>
					<Typography variant="h6" mb={4}>
						{medication.name} - ({medication.associatedDrug?.name})
					</Typography>
					<form onSubmit={(event) => handleSubmit(index, event)}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Box mb={2} display="flex" justifyContent="center">
									<TextField
										name="name"
										label="Name"
										fullWidth
										value={medication.name}
										onChange={(event) => handleInputChange(index, event)}
									/>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<TextField
									name="description"
									label="Description"
									value={medication.description}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<DrugSearchByNameAutocomplete
									selectedDrugId={medication.associatedDrug._id}
									onDrugSelected={(newDrugId) => handleDrugSelected(index, newDrugId)}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									name="quantity"
									label="Quantity"
									value={medication.quantity}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									name="dose"
									label="Dose"
									value={medication.dose}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									name="unitOfMeasurement"
									label="Unit of Measurement"
									value={medication.unitOfMeasurement}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} mt={2}>
							<Grid item xs={3}>
								<Box mb={2}>
									<TextField
										name="time"
										label="Time"
										type="time"
										value={
											medication.frequency.time
												? new Date(medication.frequency.time).toLocaleTimeString('en-US', {
														hour: '2-digit',
														minute: '2-digit',
														hour12: false,
													})
												: ''
										}
										onChange={(event) => handleTimeChange(index, event)}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
									/>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box mb={2} display="flex" justifyContent="center">
									<TextField
										name="dateAdded"
										label="Date Added"
										type="date"
										value={new Date(medication.dateAdded).toISOString().split('T')[0]}
										onChange={(event) => handleInputChange(index, event)}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<TextField
									name="customFrequency"
									label="Custom Frequency"
									value={medication.frequency.customFrequency}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									name="everyXHours"
									label="Every X Hours"
									type="number"
									value={medication.frequency.everyXHours}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item xs={2}>
								<Box mb={2}>
									<FormControlLabel
										control={
											<Checkbox
												checked={medication.frequency.once}
												onChange={() => handleCheckboxChange(index, 'frequency', 'once')}
											/>
										}
										label="Once"
									/>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.daily}
											onChange={() => handleCheckboxChange(index, 'frequency', 'daily')}
										/>
									}
									label="Daily"
								/>
							</Grid>
							<Grid item xs={2}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.weekly}
											onChange={() => handleCheckboxChange(index, 'frequency', 'weekly')}
										/>
									}
									label="Weekly"
								/>
							</Grid>
							<Grid item xs={2}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.monthly}
											onChange={() => handleCheckboxChange(index, 'frequency', 'monthly')}
										/>
									}
									label="Monthly"
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={[
												'sunday',
												'monday',
												'tuesday',
												'wednesday',
												'thursday',
												'friday',
												'saturday',
											].every((day) => medication.frequency.dayOfTheWeek[day])}
											onChange={() => handleEverydayChange(index)}
										/>
									}
									label="Everyday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.sunday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'sunday')
											}
										/>
									}
									label="Sunday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.monday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'monday')
											}
										/>
									}
									label="Monday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.tuesday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'tuesday')
											}
										/>
									}
									label="Tuesday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.wednesday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'wednesday')
											}
										/>
									}
									label="Wednesday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.thursday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'thursday')
											}
										/>
									}
									label="Thursday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.friday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'friday')
											}
										/>
									}
									label="Friday"
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.dayOfTheWeek.saturday}
											onChange={() =>
												handleCheckboxChange(index, 'frequency.dayOfTheWeek', 'saturday')
											}
										/>
									}
									label="Saturday"
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} justifyContent={'space-between'}>
							<Grid item>
								<Box mt={2}>
									<Styled3DButtonTeal
										type="submit"
										variant="contained"
										sx={{ color: '#fff', width: '125px' }}
									>
										Update
									</Styled3DButtonTeal>
								</Box>
							</Grid>
							<Grid item>
								<Box mt={2}>
									<Styled3DButtonRed
										variant="contained"
										onClick={() => handleDelete(index)}
										sx={{ width: '125px' }}

									>
										Delete
									</Styled3DButtonRed>
								</Box>
							</Grid>
						</Grid>
					</form>
				</Box>
			))}
		</>
	);
}

export default EditMedications;
