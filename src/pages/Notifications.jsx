import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { NotificationContext } from '../contexts/NotificationContext';

function NotificationsPage() {
    const { notifications, removeNotification, addNotification } = useContext(NotificationContext);

    const handleTestNotification = () => {
        addNotification({
            id: Date.now(), // Use the current timestamp as a unique ID
            message: 'This is a test notification',
        });
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
                <Card key={notification.id}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" component="p">
                                {notification.message}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => removeNotification(notification.id)}>
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