import React, { useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import { Typography, Box, Card, CardContent, Divider } from '@mui/material';

const MedicationHistory = () => {
    const { medications } = useContext(MedicationContext);

    return (
        <Box>
            {medications.map((medication) => (
                <Card key={medication._id} sx={{ margin: 2 }}>
                    <CardContent>
                        <Typography variant="h4">Medication History</Typography>
                        <Divider />
                        <Typography variant="h5">{medication.name}</Typography>
                        <Typography variant="body1">{medication.description}</Typography>
                        <Typography variant="h4">Intake History</Typography>
                        {medication.medicationIntakes.map((intake) => (
                            <Box key={intake._id}>
                                <Typography variant="body1">Quantity: {intake.quantity}</Typography>
                                <Typography variant="body1">Taken At: {new Date(intake.takenAt).toLocaleString()}</Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default MedicationHistory;