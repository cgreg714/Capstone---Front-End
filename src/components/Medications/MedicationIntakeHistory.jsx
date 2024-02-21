import React, { useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import {
	Typography,
	Box,
	Card,
	CardContent,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MedicationHistory = () => {
	const { medications } = useContext(MedicationContext);

	// Flatten medications and intakes into a single array
	const flattenedMedications = medications.flatMap((medication) =>
		medication.medicationIntakes.map((intake) => ({
			...medication,
			takenAt: intake.takenAt,
			intakeId: intake._id,
			intakeQuantity: intake.quantity,
		}))
	);

	// Sort medications by date in descending order
	const sortedMedications = flattenedMedications.sort((a, b) => {
		const dateA = new Date(a.takenAt);
		const dateB = new Date(b.takenAt);
		return dateB - dateA;
	});

	// Group medications by month and then by day
	const groupedMedications = sortedMedications.reduce((months, medication) => {
		const date = new Date(medication.takenAt);
		const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Get the year and month directly from the date string
		const dayStr = date.toISOString().split('T')[0];
		if (!months[monthStr]) {
			months[monthStr] = {};
		}
		if (!months[monthStr][dayStr]) {
			months[monthStr][dayStr] = [];
		}
		months[monthStr][dayStr].push(medication);
		return months;
	}, {});

	return (
		<Box>
			{Object.entries(groupedMedications).map(([month, days]) => {
				const [year, monthIndex] = month.split('-');
				return (
					<Accordion key={month} sx={{ bgcolor: '#717171' }} >
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="h5">
								{new Date(year, monthIndex - 1).toLocaleDateString(undefined, {
									year: 'numeric',
									month: 'long',
								})}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{Object.entries(days).map(([day, medications]) => (
								<Box key={day}>
									<Typography variant="h6">
										{new Date(day).toLocaleDateString(undefined, {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</Typography>
									<Divider />
									{medications.map((medication) => (
										<Box key={medication.intakeId} mb={2}>
											<Card>
												<CardContent>
													<Typography variant="h6">
														{medication.name} - {medication.associatedDrug.products[0].name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{medication.dose} mg - {medication.intakeQuantity}{' '}
														{medication.intakeQuantity > 1 ? 'Pills' : 'Pill'} -{' '}
														{new Date(medication.takenAt).toLocaleTimeString([], {
															hour: '2-digit',
															minute: '2-digit',
														})}
													</Typography>
												</CardContent>
											</Card>
										</Box>
									))}
								</Box>
							))}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Box>
	);
};

export default MedicationHistory;
