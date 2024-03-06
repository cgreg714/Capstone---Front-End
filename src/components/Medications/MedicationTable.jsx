import React, { useEffect, useState, useContext } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Box,
	Divider,
} from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MedicationIntakeForm from './MedicationIntakeForm';
import AddMedicationForm from './AddMedicationForm';
import { useTheme } from '@mui/material/styles';

function MedicationTable() {
	const { medications, getAllMedications, addQuantity } = useContext(MedicationContext);
	const [open, setOpen] = useState(false);
	const [selectedMedicationId, setSelectedMedicationId] = useState(null);

	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const [refillOpen, setRefillOpen] = useState(false);
	const [refillAmount, setRefillAmount] = useState('');
	const [addOpen, setAddOpen] = useState(false);

	// eslint-disable-next-line
	const theme = useTheme();

	const handleAddMedicationOpen = () => {
		setAddOpen(true);
	};

	const handleAddMedicationClose = () => {
		setAddOpen(false);
	};
	useEffect(() => {
		getAllMedications();
	}, [medications, getAllMedications]);

	const handleClickOpen = (medicationId) => {
		setSelectedMedicationId(medicationId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleRefillOpen = (medicationId) => {
		setSelectedMedicationId(medicationId);
		setRefillOpen(true);
	};

	const handleRefillClose = () => {
		setRefillOpen(false);
	};

	const handleRefillSubmit = async () => {
		if (selectedMedicationId && refillAmount) {
			try {
				await addQuantity(selectedMedicationId, refillAmount);
				setRefillAmount('');
				handleRefillClose();

				setSnackbarMessage('Refill submitted successfully');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('An error occurred while submitting the refill');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	return (
		<TableContainer
			component={Paper}
			sx={{
				border: '2px solid grey',
				boxShadow: (theme) =>
					`0 5px 5px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
				borderRadius: 4,
			}}
		>
			<Table>
				<TableHead sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}>
					<TableRow sx={{ backgroundColor: (theme) => theme.palette.third.main }}>
						<TableCell colSpan={8}>
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">Medications</Typography>
								<Button variant="contained" color="secondary" onClick={handleAddMedicationOpen}>
									Add Medication
								</Button>
							</Box>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Drug</TableCell>
						<TableCell>Date Added</TableCell>
						<TableCell>Dose</TableCell>
						<TableCell>Frequency</TableCell>
						<TableCell sx={{ textAlign: 'center' }}>Quantity Remaining</TableCell>
						<TableCell sx={{ textAlign: 'center' }}>Refill</TableCell>
						<TableCell sx={{ textAlign: 'center' }}>Add Intake</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{medications.map((medication, index) => (
						<TableRow key={index}>
							<TableCell>{medication.name}</TableCell>
							<TableCell>{medication.associatedDrug && medication.associatedDrug.name}</TableCell>
							<TableCell sx={{ width: '150px' }}>
								{new Date(medication.dateAdded).toLocaleDateString()}
							</TableCell>
							<TableCell
								sx={{ width: '150px' }}
							>{`${medication.dose} ${medication.unitOfMeasurement}`}</TableCell>
							<TableCell sx={{ width: '200px', textAlign: 'center' }}>
								{medication.frequency.customFrequency && (
									<div>{medication.frequency.customFrequency}</div>
								)}
								{Object.values(medication.frequency.dayOfTheWeek).every((val) => val)
									? 'Everyday'
									: ['weekly', 'biWeekly', 'monthly', 'daily', 'once'].map((interval) => {
											if (medication.frequency[interval]) {
												return (
													<div key={interval}>
														{interval.charAt(0).toUpperCase() + interval.slice(1)}
													</div>
												);
											}
											return null;
									  })}
								{Object.entries(medication.frequency.dayOfTheWeek).map(([day, value]) => {
									if (
										value &&
										!Object.values(medication.frequency.dayOfTheWeek).every((val) => val)
									) {
										return <div key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</div>;
									}
									return null;
								})}
								{Object.entries(medication.frequency.timeOfDay).map(([timeOfDay, value]) => {
									if (value) {
										return (
											<div key={timeOfDay}>
												{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
											</div>
										);
									}
									return null;
								})}
								{medication.frequency.time && (
									<div>
										{`${new Date(`${medication.frequency.time}`).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											hour12: true,
										})}`}
									</div>
								)}
							</TableCell>
							<TableCell sx={{ paddingLeft: '40px', width: '80px' }}>
								{isNaN(medication.quantity) ? <s>0</s> : medication.quantity}
							</TableCell>
							<TableCell>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleRefillOpen(medication._id)}
								>
									Refill
								</Button>
							</TableCell>
							<TableCell sx={{ width: '275px' }}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleClickOpen(medication._id)}
								>
									Add Intake
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog open={refillOpen} onClose={handleRefillClose}>
				<DialogTitle>Refill Medication</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Refill Amount"
						type="number"
						fullWidth
						value={refillAmount}
						onChange={(e) => setRefillAmount(e.target.value)}
					/>
					<Button onClick={handleRefillSubmit} color="primary">
						Submit
					</Button>
				</DialogContent>
			</Dialog>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Medication Intake</DialogTitle>
				<DialogContent>
					<MedicationIntakeForm medicationId={selectedMedicationId} handleClose={handleClose} />
				</DialogContent>
			</Dialog>
			<Dialog open={addOpen} onClose={handleAddMedicationClose}>
				<DialogTitle>Add Medication</DialogTitle>
				<DialogContent>
					<AddMedicationForm handleClose={handleAddMedicationClose} />
				</DialogContent>
			</Dialog>
		</TableContainer>
	);
}

export default MedicationTable;
