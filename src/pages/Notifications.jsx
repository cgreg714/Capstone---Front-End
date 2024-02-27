import React, { useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { ProfileContext } from '../contexts/ProfileContext';

function NotificationsPage() {
    const { notifications, createNotification, deleteNotification, getAllNotifications } = useContext(ProfileContext);

    useEffect(() => {
        getAllNotifications();
    }, [notifications, getAllNotifications]);

    const handleTestNotification = () => {
        const testNotification = {
            text: 'This is a test notification',
            severity: 'medium',
            type: 'info',
            read: false,
        };
        createNotification(testNotification);
    };

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

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Notifications
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleTestNotification}>
                Add Test Notification
            </Button>
            {notifications.map((notification) => (
                <Card key={notification._id} style={getCardStyles(notification.severity)}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" component="p">
                                {notification.text}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => deleteNotification(notification._id)}>
                                Dismiss
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default NotificationsPage;