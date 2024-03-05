import React, { useContext, useEffect, useState } from 'react';
import {
	Typography,
	Grid,
	Button,
	Card,
	CardContent,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { ProfileContext } from '../contexts/ProfileContext';
import NotificationCard from '../components/Notifications/NotificationCard';
import { Styled3DButtonRed } from '../styles/mainLayoutStyles';

function NotificationsPage() {
	const { notifications, deleteNotification, getAllNotifications, deleteAllNotifications } =
		useContext(ProfileContext);
	const [sort, setSort] = useState('date');
	const [sortDirection, setSortDirection] = useState('desc');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getAllNotifications();
	}, [notifications, getAllNotifications]);

	const sortedNotifications = [...notifications].sort((a, b) => {
		if (sort === 'date') {
			return sortDirection === 'desc'
				? new Date(b.createdAt) - new Date(a.createdAt)
				: new Date(a.createdAt) - new Date(b.createdAt);
		} else if (sort === 'severity') {
			const severityValues = { low: 1, medium: 2, high: 3 };
			return sortDirection === 'desc'
				? severityValues[b.severity] - severityValues[a.severity]
				: severityValues[a.severity] - severityValues[b.severity];
		} else {
			return 0;
		}
	});

	const handleSort = (sortType) => {
		if (sort === sortType) {
			setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
		} else {
			setSort(sortType);
			setSortDirection('desc');
		}
	};

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
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={6}>
				<Card
					sx={{
						border: '2px solid grey',
						marginTop: 2,
						marginBottom: 1,
						boxShadow: (theme) => `0 5px 5px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
						borderRadius: 4,
					}}
				>
					<CardContent>
						<Typography variant="h4" component="h1" gutterBottom>
							Notifications
						</Typography>
						<Box display="flex" justifyContent="space-between" marginBottom={2}>
							<Box spacing={2} display="flex" justifyContent="space-between">
								<Box marginRight={2}>
									<Button
										variant="contained"
										color="third"
										onClick={() => handleSort('date')}
										sx={{ minWidth: 175 }}
									>
										Sort by Date
										<ArrowDropUp
											color={sort === 'date' && sortDirection === 'asc' ? 'inherit' : 'disabled'}
										/>
										<ArrowDropDown
											color={sort === 'date' && sortDirection === 'desc' ? 'inherit' : 'disabled'}
										/>
									</Button>
								</Box>
								<Button
									variant="contained"
									color="third"
									onClick={() => handleSort('severity')}
									sx={{ minWidth: 175 }}
								>
									Sort by Severity
									<ArrowDropUp
										color={sort === 'severity' && sortDirection === 'asc' ? 'inherit' : 'disabled'}
									/>
									<ArrowDropDown
										color={sort === 'severity' && sortDirection === 'desc' ? 'inherit' : 'disabled'}
									/>
								</Button>
							</Box>
							<Styled3DButtonRed variant="contained" onClick={handleOpen} sx={{ width: '150px' }}>
								Dismiss All
							</Styled3DButtonRed>
						</Box>
						<Grid container rowSpacing={3} columnSpacing={3}>
							{sortedNotifications.map((notification) => (
								<Grid item xs={12} key={notification._id}>
									<NotificationCard
										notification={notification}
										deleteNotification={deleteNotification}
									/>
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
						<DialogTitle id="alert-dialog-title">{'Confirm Dismiss All'}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Are you sure you want to dismiss all notifications?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button variant="contained" onClick={handleClose} color="secondary">
								Cancel
							</Button>
							<Button variant="contained" onClick={handleDeleteAll} color="primary" autoFocus>
								Yes, Dismiss All
							</Button>
						</DialogActions>
					</Dialog>
				</Card>
			</Grid>
		</Grid>
	);
}

export default NotificationsPage;
