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
} from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import MedicationIntakeForm from './MedicationIntakeForm';

function MedicationTable() {
	const { medications, getAllMedications, addQuantity } = useContext(MedicationContext);
	const [open, setOpen] = useState(false);
	const [selectedMedicationId, setSelectedMedicationId] = useState(null);

	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const [refillOpen, setRefillOpen] = useState(false);
	const [refillAmount, setRefillAmount] = useState('');

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
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell colSpan={8}>
							<Typography variant="h6">Medications</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Drug</TableCell>
						<TableCell>Date Added</TableCell>
						<TableCell>Dose</TableCell>
						<TableCell>Frequency</TableCell>
						<TableCell>Quantity Left</TableCell>
						<TableCell>Refill</TableCell>
						<TableCell>Add Intake</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{medications.map((medication, index) => (
						<TableRow key={index}>
							<TableCell>{medication.name}</TableCell>
							<TableCell>
								{medication.associatedDrug && medication.associatedDrug.name}
								{medication.associatedDrug &&
									medication.associatedDrug.products &&
									medication.associatedDrug.products.length > 0 &&
									`(${medication.associatedDrug.products[0].name})`}
							</TableCell>
							<TableCell>{new Date(medication.dateAdded).toLocaleDateString()}</TableCell>
							<TableCell>{`${medication.dose} ${medication.unitOfMeasurement}`}</TableCell>
							<TableCell>
								{['weekly', 'biWeekly', 'monthly', 'daily', 'once'].map((interval) => {
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
									if (value) {
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
										{`${new Date(`1970-01-01T${medication.frequency.time}Z`).toLocaleTimeString(
											[],
											{
												hour: '2-digit',
												minute: '2-digit',
												hour12: true,
											}
										)}`}
									</div>
								)}
							</TableCell>
							<TableCell>{medication.quantity}</TableCell>
							<TableCell>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleRefillOpen(medication._id)}
								>
									Refill
								</Button>
							</TableCell>
							<TableCell>
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
		</TableContainer>
	);
}

export default MedicationTable;
