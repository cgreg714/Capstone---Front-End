import React, { useState, useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Button,
	InputAdornment,
	IconButton,
	Select,
	MenuItem,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MedIntakeFormTwo = () => {
	const { createIntake, medications } = useContext(MedicationContext);
	const [intake, setIntake] = useState({
		quantity: '',
		time: new Date().toISOString().substring(0, 16),
		medication: '',
	});

	const handleChange = (event) => {
		setIntake({
			...intake,
			[event.target.name]: event.target.value,
		});
	};

	const handleTimeIconClick = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

		setIntake({
			...intake,
			time: localDateTime,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await createIntake(intake.medication, intake);
			setIntake({
				quantity: '',
				time: new Date().toISOString().substring(0, 16),
				medication: '',
			});
		} catch (error) {
			console.error('Failed to submit medication intake:', error);
		}
	};

	return (
		<Card>
			<CardHeader title="Add Medication Intake" />
			<CardContent>
				<form onSubmit={handleSubmit}>
					<Select name="medication" value={intake.medication} onChange={handleChange} required>
						{medications.map((medication) => (
							<MenuItem key={medication._id} value={medication._id}>
								{medication.name}
							</MenuItem>
						))}
					</Select>
					<TextField
						name="quantity"
						label="Quantity"
						type="number"
						value={intake.quantity}
						onChange={handleChange}
						required
					/>
					<TextField
						name="time"
						label="Time"
						type="datetime-local"
						value={intake.time}
						onChange={handleChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleTimeIconClick}>
										<AccessTimeIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>
					<Button type="submit" color="primary">
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default MedIntakeFormTwo;
