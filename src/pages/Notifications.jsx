import React, { useContext, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { ProfileContext } from '../contexts/ProfileContext';
import NotificationCard from '../components/Notifications/NotificationCard';

function NotificationsPage() {
    const { notifications, deleteNotification, getAllNotifications } = useContext(ProfileContext);

    useEffect(() => {
        getAllNotifications();
    }, [notifications, getAllNotifications]);

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Notifications
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {notifications.map((notification) => (
                    <Grid item xs={12} md={6} key={notification._id}>
                        <NotificationCard notification={notification} deleteNotification={deleteNotification} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default NotificationsPage;