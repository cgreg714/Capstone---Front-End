import React, { useContext, useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Typography,
} from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';

const MedicationCards = () => {
	const { medications, deleteMedication, updateMedication, addQuantity } = useContext(MedicationContext);
	const [editingMedication, setEditingMedication] = useState(null);

	const handleEdit = (medication) => {
		setEditingMedication(medication);
	};

	const handleUpdate = (event) => {
		event.preventDefault();

		const updatedMedication = {
			name: event.target.name.value,
			description: event.target.description.value,
			unitOfMeasurement: event.target.unitOfMeasurement.value,
			dose: event.target.dose.value,
			frequency: {
				time: event.target.time.value,
				timeOfDay: {
					morning: event.target.morning.checked,
					noon: event.target.noon.checked,
					evening: event.target.evening.checked,
					bedtime: event.target.bedtime.checked,
				},
				dayOfTheWeek: {
					sunday: event.target.sunday.checked,
					monday: event.target.monday.checked,
					tuesday: event.target.tuesday.checked,
					wednesday: event.target.wednesday.checked,
					thursday: event.target.thursday.checked,
					friday: event.target.friday.checked,
					saturday: event.target.saturday.checked,
				},
				day: event.target.day.value,
				once: event.target.once.checked,
				daily: event.target.daily.checked,
				weekly: event.target.weekly.checked,
				biWeekly: event.target.biWeekly.checked,
				monthly: event.target.monthly.checked,
			},
			quantity: event.target.quantity.value,
			dateAdded: event.target.dateAdded.value,
			prescriber: event.target.prescriber.value,
			associatedDrug: event.target.associatedDrug.value,
		};

		updateMedication(editingMedication._id, updatedMedication);
		setEditingMedication(null);
	};

	const handleAddQuantity = (medicationId) => {
		addQuantity(medicationId);
	};

	return (
		<div>
			{medications.map((medication) => (
				<Card key={medication._id} sx={{ maxWidth: 345, marginBottom: 2 }}>
					<CardHeader title={medication.name} />
					<CardContent>
						<Typography variant="body2" color="text.secondary">
							Description: {medication.description}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Dose: {medication.dose}, {medication.unitOfMeasurement}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{medication.frequency.time}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Quantity: {medication.quantity}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Date Added: {medication.dateAdded}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Prescriber: {medication.prescriber}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Drug: {medication.associatedDrug && medication.associatedDrug.name}
							{medication.associatedDrug &&
								medication.associatedDrug.products &&
								medication.associatedDrug.products[0] &&
								`(${medication.associatedDrug.products[0].name})`}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" color="primary" onClick={() => handleEdit(medication)}>
							Edit
						</Button>
						<Button size="small" color="secondary" onClick={() => deleteMedication(medication._id)}>
							Delete
						</Button>
						<Button size="small" color="primary" onClick={() => handleAddQuantity(medication._id)}>
							Add Quantity
						</Button>
					</CardActions>
				</Card>
			))}
			<Dialog open={!!editingMedication} onClose={() => setEditingMedication(null)}>
				<DialogTitle>Edit Medication</DialogTitle>
				<DialogContent>
					<form onSubmit={handleUpdate}>
						<TextField name="name" defaultValue={editingMedication?.name} />
						<TextField name="description" defaultValue={editingMedication?.description} />
						<TextField name="unitOfMeasurement" defaultValue={editingMedication?.unitOfMeasurement} />
						<TextField name="dose" defaultValue={editingMedication?.dose} />
						<TextField name="frequency" defaultValue={editingMedication?.frequency} />
						<TextField name="quantity" defaultValue={editingMedication?.quantity} />
						<TextField name="dateAdded" defaultValue={editingMedication?.dateAdded} />
						<TextField name="prescriber" defaultValue={editingMedication?.prescriber} />
						<Button type="submit" color="primary">
							Save
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default MedicationCards;
