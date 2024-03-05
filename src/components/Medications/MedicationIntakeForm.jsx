import React, { useState, useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import { Card, CardContent, TextField, Button, InputAdornment, IconButton, Grid, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { SnackbarContext } from '../../contexts/SnackbarContext';

const MedicationIntakeForm = ({ medicationId, handleClose }) => {
	const { createIntake, getAllMedications, getMedication } = useContext(MedicationContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const [intake, setIntake] = useState({
		quantity: '1',
		takenAt: new Date().toLocaleString('sv-SE').replace(' ', 'T').substring(0, 16),
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
			takenAt: localDateTime,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await createIntake(medicationId, intake);
			await getMedication(medicationId);
			setIntake({
				quantity: '',
				takenAt: new Date().toISOString().substring(0, 16),
			});
			getAllMedications();
			handleClose();
		} catch (error) {
			setSnackbarMessage('Failed to submit medication intake');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	return (
		<Card
			sx={{
				border: '2px solid grey',
				marginTop: 2,
				marginBottom: 1,
				boxShadow: (theme) =>
					`0 5px 5px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
				borderRadius: 4,
			}}
		>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2} style={{ margin: 0 }}>
						<Grid item xs={4}>
							<TextField
								name="quantity"
								label="Quantity"
								type="number"
								value={intake.quantity}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="takenAt"
								label="Taken At"
								type="datetime-local"
								value={intake.takenAt}
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
						</Grid>
					</Grid>
					<Box display="flex" justifyContent="center" mt={2}>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							sx={{
								width: '45%',
								color: 'black',
								fontWeight: 'bolder',
								fontFamily: 'Comfortaa',
								borderRadius: 20,
								zIndex: 1,
								'&:hover': {
									backgroundColor: (theme) => theme.palette.hoverGrey,
								},
							}}
						>
							Submit
						</Button>
					</Box>
				</form>
			</CardContent>
		</Card>
	);
};

export default MedicationIntakeForm;
