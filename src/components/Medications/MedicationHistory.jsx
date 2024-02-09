import React, { useEffect, useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { getAllMedications } from '../../api/medicationAPI';
import { ProfileContext } from '../../contexts/ProfileContext';

function MedicationTable() {
    const [medications, setMedications] = useState([]);
    const { userId, profileId } = useContext(ProfileContext);

    useEffect(() => {
        getAllMedications(userId, profileId)
            .then(data => {
                data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                setMedications(data);
            })
            .catch(error => console.error(error));
    }, [userId, profileId]);

    return (
        <TableContainer component={Paper}>
            {medications.map((medication, index) => (
                <Table key={index}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Typography variant="h6">{new Date(medication.dateAdded).toLocaleDateString()}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Dose</TableCell>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Quantity Left</TableCell>
                            <TableCell>Intakes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{medication.name}</TableCell>
                            <TableCell>{medication.dose}</TableCell>
                            <TableCell>{medication.frequency.time}</TableCell>
                            <TableCell>{medication.quantity}</TableCell>
                            <TableCell>
                                {medication.medicationIntakes.map((intake, intakeIndex) => (
                                    <div key={intakeIndex}>{new Date(intake.takenAt).toLocaleString()}</div>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ))}
        </TableContainer>
    );
}

export default MedicationTable;