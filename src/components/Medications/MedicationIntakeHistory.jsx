import React, { useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { Styled3DButtonRed } from '../../styles/mainLayoutStyles';

const MedicationHistory = () => {
	// eslint-disable-next-line
	const { medications, updateIntake, deleteIntake } = useContext(MedicationContext);
	const theme = useTheme();

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
		const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
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
		<Card
			sx={{
				border: '2px solid grey',
				borderRadius: 4,
				boxShadow: (theme) =>
					`0 5px 5px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
			}}
		>
			<CardHeader title="Medication Intakes" />
			<CardContent>
				<Box>
					{Object.entries(groupedMedications).map(([month, days]) => {
						const [year, monthIndex] = month.split('-');
						return (
							<Accordion key={month} sx={{ bgcolor: theme.palette.third.main, mb: 2 }}>
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
											{medications.map((medication, index) => (
												<Box key={`${medication.intakeId}-${index}`} mb={2}>
													<Card>
														<CardContent>
															<Box flexDirection="column">
																<Box display="flex" justifyContent="space-between" alignItems="center">
																	<Typography variant="h6">
																		{medication.name} -{' '}
																		{medication.associatedDrug ? medication.associatedDrug.name : 'No Drug'}
																	</Typography>
																</Box>
																<Box display="flex" justifyContent="space-between" alignItems="center">
																	<Typography variant="body2" color="text.secondary">
																		{medication.dose} mg -{' '}
																		{medication.intakeQuantity}{' '}
																		{medication.intakeQuantity > 1 ? 'Pills' : 'Pill'}{' '}
																		-{' '}
																		{new Date(medication.takenAt).toLocaleTimeString([], {
																			hour: '2-digit',
																			minute: '2-digit',
																		})}
																	</Typography>
																	<Styled3DButtonRed
																		variant="contained"
																		sx={{ width: '40%' }}
																		onClick={() => {
																			if (
																				window.confirm(
																					'Are you sure you want to delete this intake?'
																				)
																			) {
																				deleteIntake(medication._id, medication.intakeId);
																			}
																		}}
																	>
																		Delete
																	</Styled3DButtonRed>
																</Box>
															</Box>
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
			</CardContent>
		</Card>
	);
};

export default MedicationHistory;
