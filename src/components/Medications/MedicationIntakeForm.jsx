import React, { useState, useContext } from 'react';
import { MedicationContext } from '../../contexts/MedicationContext';
import { Card, CardHeader, CardContent, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MedicationIntakeForm = ({ medicationId }) => {
    const { createIntake } = useContext(MedicationContext);
    const [intake, setIntake] = useState({
        quantity: '',
        takenAt: new Date().toISOString().substring(0, 16),
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
            setIntake({
                quantity: '',
                takenAt: new Date().toISOString().substring(0, 16),
            });
        } catch (error) {
            console.error('Failed to submit medication intake:', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="quantity"
                        label="Quantity"
                        type="number"
                        value={intake.quantity}
                        onChange={handleChange}
                        required
                    />
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
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default MedicationIntakeForm;