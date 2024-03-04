import React, { useState, useContext } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	List,
	ListItem,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from '@mui/material';
import { MedicationContext } from '../../../../../contexts/MedicationContext';
import { useTheme } from '@mui/material/styles';

function CardBody({
	_id,
	name,
	description,
	unitOfMeasurement,
	dose,
	frequency,
	quantity,
	dateAdded,
	doctor,
	pharmacy,
	associatedDrug,
}) {
	const { updateMedication, deleteMedication, addQuantity } = useContext(MedicationContext);
	const trueFrequencies = Object.keys(frequency)
		.filter((key) => frequency[key] === true || key === 'customFrequency')
		.map((key) => {
			if (key === 'customFrequency' && typeof frequency[key] === 'string') {
				return frequency[key];
			} else {
				return key.replace(/./, (char) => char.toUpperCase());
			}
		});
	const time = new Date(frequency.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
	const theme = useTheme();

	const [refillOpen, setRefillOpen] = useState(false);
	const [refillAmount, setRefillAmount] = useState('');
	const [deleteOpen, setDeleteOpen] = useState(false);

	/* eslint-disable */
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(name);
	const [editedDescription, setEditedDescription] = useState(description);
	const [editedAssociatedDrug, setEditedAssociatedDrug] = useState(associatedDrug);
	const [editedDose, setEditedDose] = useState(dose);
	const [editedUnitOfMeasurement, setEditedUnitOfMeasurement] = useState(unitOfMeasurement);
	const [editedDoctor, setEditedDoctor] = useState(doctor);
	const [editedPharmacy, setEditedPharmacy] = useState(pharmacy);
	const [editedFrequency, setEditedFrequency] = useState(frequency);
	const [editedTime, setEditedTime] = useState(time);
	const [editedQuantity, setEditedQuantity] = useState(quantity);
	const [editedDateAdded, setEditedDateAdded] = useState(dateAdded);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		updateMedication(_id, {
			name: editedName,
			description: editedDescription,
			associatedDrug: editedAssociatedDrug._id,
			dose: editedDose,
			unitOfMeasurement: editedUnitOfMeasurement,
			doctor: editedDoctor,
			pharmacy: editedPharmacy,
			frequency: editedFrequency,
			time: editedTime,
			quantity: editedQuantity,
			dateAdded: editedDateAdded,
		});
		setIsEditing(false);
	};

	const handleDelete = () => {
		deleteMedication(_id);
		setDeleteOpen(false);
	};

	const handleDeleteOpen = () => {
		setDeleteOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
	};

	const handleRefillOpen = () => {
		setRefillOpen(true);
	};

	const handleRefillClose = () => {
		setRefillOpen(false);
	};

	const handleRefillSubmit = async () => {
		if (refillAmount) {
			await addQuantity(_id, refillAmount);
			setRefillAmount('');
			handleRefillClose();
		}
	};

	return (
		<Box>
			<Card
				sx={{
					m: 4,
					minWidth: 275,
					borderRadius: 4,
					boxShadow: theme.palette.mode === 'dark' ? '0 6px 10px white' : '0 6px 10px black',
				}}
			>
				<CardContent>
					<Typography variant="h5" component="div">
						{name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
					<List>
						<ListItem>
							{associatedDrug.name} - {dose} {unitOfMeasurement}{' '}
						</ListItem>
						<ListItem>Doctor: {doctor}</ListItem>
						<ListItem>Pharmacy: {pharmacy}</ListItem>
						<ListItem>Frequency: {trueFrequencies.join(', ')}</ListItem>
						<ListItem>Time: {time}</ListItem>
						<ListItem>Quantity: {quantity} Remaining</ListItem>
						<ListItem>Date Added: {new Date(dateAdded).toLocaleDateString()}</ListItem>
					</List>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						size="small"
						color="third"
						sx={{ color: 'black' }}
						onClick={() => handleRefillOpen(_id)}
					>
						Refill
					</Button>
					<Box sx={{ flexGrow: 1 }} />
					<Button
						variant="contained"
						size="small"
						sx={{ color: 'black' }}
						color="primary"
						onClick={handleDeleteOpen}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
			<Dialog open={deleteOpen} onClose={handleDeleteClose}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					<Typography>Are you sure you want to delete this medication?</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleDeleteClose} color="secondary">
						Cancel
					</Button>
					<Box sx={{ flexGrow: 1 }} />

					<Button variant="contained" onClick={handleDelete} color="primary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
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
					<Button variant="contained" onClick={handleRefillSubmit} color="primary">
						Submit
					</Button>
				</DialogContent>
			</Dialog>
		</Box>
	);
}

export default CardBody;
