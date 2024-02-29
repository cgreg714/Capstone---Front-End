import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import BuddyIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { FaPersonHalfDress } from 'react-icons/fa6';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { useTheme } from '@mui/material/styles';

import { ProfileContext } from '../../../contexts/ProfileContext';

const ABuddyCard = () => {
	const { abuddies, updateABuddy } = useContext(ProfileContext);

	const [selectedBuddy, setSelectedBuddy] = useState(null);
	const [editedBuddy, setEditedBuddy] = useState(null);
	const [isBuddyEditMode, setIsBuddyEditMode] = useState(false);
	const theme = useTheme();

	const handleBuddyEdit = (buddy) => {
		setSelectedBuddy(buddy);
		setEditedBuddy({ ...buddy });
		setIsBuddyEditMode(true);
	};

	const handleBuddySave = () => {
		if (editedBuddy) {
			updateABuddy(selectedBuddy._id, editedBuddy);
			setIsBuddyEditMode(false);
		}
	};

	const handleBuddyCancel = () => {
		setIsBuddyEditMode(false);
		setEditedBuddy(null);
		setSelectedBuddy(null);
	};

	return (
		<Grid container spacing={2}sx={{ marginLeft: 5 }}>
			{abuddies.map((buddy, index) => (
				<Grid item xs={3} key={buddy._id}>
					<Card
						sx={{
							maxWidth: 250,
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.cardBackground,
						}}
					>
						<CardContent>
							{!isBuddyEditMode || selectedBuddy._id !== buddy._id ? (
								<div>
									<Typography variant="h5" component="div">
										<Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
											<BuddyIcon />
											<Box ml={1}>
												{buddy.firstName} {buddy.lastName}
											</Box>
										</Box>
									</Typography>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<FaPersonHalfDress size={24} />
										<Box ml={1}>{buddy.relation}</Box>
									</Box>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<PhoneIcon />
										<Box ml={1}>{formatPhoneNumber(buddy.phoneNumber)}</Box>
									</Box>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<MailIcon />
										<Box ml={1}>{buddy.email}</Box>
									</Box>
									<Button
										variant="contained"
										sx={{
											width: '50%',
											color: 'black',
											fontWeight: 'bolder',
											fontFamily: 'Comfortaa',
											borderRadius: 20,
											zIndex: 1,
											'&:hover': {
												backgroundColor: (theme) => theme.palette.hoverGrey,
											},
										}}
										color="secondary"
										fullWidth
										onClick={() => handleBuddyEdit(buddy)}
									>
										Edit
									</Button>
								</div>
							) : (
								<div>
									<TextField
										label="First Name"
										value={editedBuddy.firstName}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, firstName: e.target.value })}
									/>
									<TextField
										label="Last Name"
										value={editedBuddy.lastName}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, lastName: e.target.value })}
									/>
									<TextField
										label="Email"
										value={editedBuddy.email}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, email: e.target.value })}
									/>
									<TextField
										label="Relation"
										value={editedBuddy.relation}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, relation: e.target.value })}
									/>
									<Button
										variant="contained"
										sx={{
											width: '50%',
											color: 'black',
											fontWeight: 'bolder',
											fontFamily: 'Comfortaa',
											borderRadius: 20,
											zIndex: 1,
											'&:hover': {
												backgroundColor: (theme) => theme.palette.hoverGrey,
											},
										}}
										color="secondary"
										fullWidth
										onClick={handleBuddySave}
									>
										Save
									</Button>
									<Button
										variant="contained"
										sx={{
											width: '50%',
											color: 'black',
											fontWeight: 'bolder',
											fontFamily: 'Comfortaa',
											borderRadius: 20,
											zIndex: 1,
											'&:hover': {
												backgroundColor: (theme) => theme.palette.hoverGrey,
											},
										}}
										color="secondary"
										fullWidth
										onClick={handleBuddyCancel}
									>
										Cancel
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default ABuddyCard;
