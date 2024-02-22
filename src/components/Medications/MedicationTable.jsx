import React, { useEffect, useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { getAllMedications } from '../../api/medicationAPI';
import { ProfileContext } from '../../contexts/ProfileContext';

function MedicationTable() {
	const [medications, setMedications] = useState([]);
	const { userId, profileId } = useContext(ProfileContext);

	useEffect(() => {
		getAllMedications(userId, profileId)
			.then((data) => {
				data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
				setMedications(data);
			})
			.catch((error) => console.error(error));
	}, [userId, profileId]);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell colSpan={6}>
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
                                    medication.associatedDrug.products[0] &&
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
										{`Time: ${new Date(
											`1970-01-01T${medication.frequency.time}Z`
										).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											hour12: true,
										})}`}
									</div>
								)}{' '}
							</TableCell>
							<TableCell>{medication.quantity}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default MedicationTable;
