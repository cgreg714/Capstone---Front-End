import React from 'react';
import { Card, CardContent, Typography, Button, Box, Dialog } from '@mui/material';
import MedicationIntakeForm from '../Medications/MedicationIntakeForm';

function NotificationCard({ notification, deleteNotification }) {
    const [open, setOpen] = React.useState(false);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low':
                return 'green';
            case 'medium':
                return 'orange';
            case 'high':
                return 'red';
            default:
                return 'info';
        }
    };

    const getCardStyles = (severity) => {
        const color = getSeverityColor(severity);
        return {
            borderColor: color,
            borderWidth: '2px',
            borderStyle: 'solid',
            backgroundColor: `${color}20`,
        };
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card style={getCardStyles(notification.severity)}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" component="p">
                        {notification.text}
                    </Typography>
                    <Box>
                        {notification.type === 'missedIntake' && (
                            <Button variant="contained" color="secondary" onClick={handleOpen}>
                                Add Intake
                            </Button>
                        )}
                        <Button variant="contained" color="primary" onClick={() => deleteNotification(notification._id)}>
                            Dismiss
                        </Button>
                    </Box>
                </Box>
            </CardContent>
            <Dialog open={open} onClose={handleClose}>
                <MedicationIntakeForm medicationId={notification.medicationId} handleClose={handleClose} />
            </Dialog>
        </Card>
    );
}

export default NotificationCard;