import React from 'react';
import { Card, CardContent, Typography, Box, Dialog } from '@mui/material';
import MedicationIntakeForm from '../Medications/MedicationIntakeForm';
import { Styled3DButtonRed, Styled3DButtonGreen } from '../../styles/mainLayoutStyles';

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
                    {notification.type === 'missed_medication' && (
                        <Styled3DButtonGreen variant="contained" color="secondary" onClick={handleOpen} style={{ width: '200px', height: '80%' }}>
                            Add Intake
                        </Styled3DButtonGreen>
                    )}
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                        Created at: {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                    <Styled3DButtonRed variant="contained" color="primary" onClick={() => deleteNotification(notification._id)} style={{ width: '180px' }}>
                        Dismiss
                    </Styled3DButtonRed>
                </Box>
            </CardContent>
            <Dialog open={open} onClose={handleClose}>
                <MedicationIntakeForm medicationId={notification.medicationId} handleClose={handleClose} />
            </Dialog>
        </Card>
    );
}

export default NotificationCard;