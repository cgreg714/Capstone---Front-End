import React, { useContext, useEffect, useState } from 'react';
import { Typography, Grid, Button, Card, CardContent, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ProfileContext } from '../contexts/ProfileContext';
import NotificationCard from '../components/Notifications/NotificationCard';

function NotificationsPage() {
    const { notifications, deleteNotification, getAllNotifications, deleteAllNotifications } = useContext(ProfileContext);
    const [sort, setSort] = useState('date');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllNotifications();
    }, [notifications, getAllNotifications]);

    const sortedNotifications = [...notifications].sort((a, b) => {
        if (sort === 'date') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sort === 'severity') {
            const severityValues = { low: 1, medium: 2, high: 3 };
            return severityValues[b.severity] - severityValues[a.severity];
        } else {
            return 0;
        }
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAll = () => {
        deleteAllNotifications();
        setOpen(false);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                    Notifications
                </Typography>
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Box spacing={2} display="flex" justifyContent="space-between">
                        <Box marginRight={2}>
                            <Button variant="contained" color='third' onClick={() => setSort('date')}>
                                Sort by Date
                            </Button>
                        </Box>
                        <Button variant="contained" color='third' onClick={() => setSort('severity')}>
                            Sort by Severity
                        </Button>
                    </Box>
                    <Button variant="contained" color='primary' onClick={handleOpen}>
                        Dismiss All
                    </Button>
                </Box>
                <Grid container rowSpacing={3} columnSpacing={3}>
                    {sortedNotifications.map((notification) => (
                        <Grid item xs={12} key={notification._id}>
                            <NotificationCard notification={notification} deleteNotification={deleteNotification} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Dismiss All"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to dismiss all notifications?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleDeleteAll} color="primary" autoFocus>
                        Yes, Dismiss All
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default NotificationsPage;