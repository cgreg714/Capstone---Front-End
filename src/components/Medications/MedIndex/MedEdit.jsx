import React, { useContext, useState, useEffect } from 'react';
import { MedicationContext } from '../../../contexts/MedicationContext';
import { TextField, Button, Checkbox, FormControlLabel, Box, Grid, Typography } from '@mui/material';

function EditMedications() {
	const { medications, updateMedication, deleteMedication } = useContext(MedicationContext);
	const [editedMedications, setEditedMedications] = useState([]);

	useEffect(() => {
		setEditedMedications(medications);
	}, [medications]);

	const handleInputChange = (index, event) => {
		const values = [...editedMedications];
		values[index][event.target.name] = event.target.value;
		setEditedMedications(values);
	};

	const handleCheckboxChange = (index, field, subfield) => {
		const values = [...editedMedications];
		const fieldParts = field.split('.');
		if (fieldParts.length === 2) {
			values[index][fieldParts[0]][fieldParts[1]][subfield] = !values[index][fieldParts[0]][fieldParts[1]][subfield];
		} else {
			values[index][field][subfield] = !values[index][field][subfield];
		}
		setEditedMedications(values);
	};

	const handleSubmit = (index) => {
		updateMedication(medications[index]._id, editedMedications[index]);
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
		const timeParts = event.target.value.split(':');
		const hours = parseInt(timeParts[0]);
		const minutes = parseInt(timeParts[1]);
		const time = new Date(values[index].frequency.time);
		time.setHours(hours);
		time.setMinutes(minutes);
		values[index].frequency.time = time.toISOString();
		setEditedMedications(values);
	};

	return (
		<>
			{editedMedications.map((medication, index) => (
				<Box key={medication._id} mb={4} p={2} border={1} borderRadius="borderRadius" borderColor="grey.500">
					<Typography variant="h6" mb={4}>
						{medication.name} - ({medication.associatedDrug?.name})
					</Typography>
					<form onSubmit={() => handleSubmit(index)}>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<Box mb={2} display="flex" justifyContent="center">
									<TextField
										name="name"
										label="Name"
										value={medication.name}
										onChange={(event) => handleInputChange(index, event)}
									/>
								</Box>
							</Grid>
							<Grid item xs={4}>
								<Box mb={2} display="flex" justifyContent="center">
									<TextField
										name="prescriber"
										label="Prescriber"
										value={medication.prescriber}
										onChange={(event) => handleInputChange(index, event)}
									/>
								</Box>
							</Grid>
							<Grid item xs={4}>
								<Box mb={2}>
									<TextField
										name="time"
										label="Time"
										value={new Date(medication.frequency.time).toLocaleTimeString('en-US', {
											hour: '2-digit',
											minute: '2-digit',
											hour12: true,
										})}
										onChange={(event) => handleTimeChange(index, event)}
									/>
								</Box>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									name="quantity"
									label="Quantity"
									value={medication.quantity}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									name="dose"
									label="Dose"
									value={medication.dose}
									onChange={(event) => handleInputChange(index, event)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									name="unitOfMeasurement"
									label="Unit of Measurement"
									value={medication.unitOfMeasurement}
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
							<Grid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={medication.frequency.biWeekly}
											onChange={() => handleCheckboxChange(index, 'frequency', 'biWeekly')}
										/>
									}
									label="BiWeekly"
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
							<Grid item xs={3}>
								<Box mt={2}>
									<Button
										type="submit"
										variant="contained"
										sx={{ backgroundColor: '#136E57', color: '#fff' }}
									>
										Update
									</Button>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box mt={2}>
									<Button
										variant="contained"
										sx={{ backgroundColor: '#9E1B32', color: '#fff', ml: 2 }}
										onClick={() => handleDelete(index)}
									>
										Delete
									</Button>
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
