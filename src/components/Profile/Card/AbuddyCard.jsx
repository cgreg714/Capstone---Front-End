import React, { useContext, useState, useRef } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import BuddyIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { FaPersonHalfDress } from 'react-icons/fa6';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';
import PhoneNumberInput from '../PhoneNumberInput';

const ABuddyCard = () => {
	const { abuddies, updateABuddy, deleteABuddy } = useContext(ProfileContext);

	const [selectedBuddy, setSelectedBuddy] = useState(null);
	const [editedBuddy, setEditedBuddy] = useState(null);
	const [isBuddyEditMode, setIsBuddyEditMode] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [abuddyIdToDelete, setAbuddyIdToDelete] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState('');
	const phoneNumberInputRef = useRef(null);

	const theme = useTheme();

	const handleBuddyEdit = (buddy) => {
		setSelectedBuddy(buddy);
		setEditedBuddy({ ...buddy });
		setPhoneNumber(buddy.phoneNumber);
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

	const handleOpenDialog = (buddyId) => {
		setAbuddyIdToDelete(buddyId);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleConfirmDialog = () => {
		if (abuddyIdToDelete) {
			deleteABuddy(abuddyIdToDelete);
			setDialogOpen(false);
			setAbuddyIdToDelete(null);
		}
	};

	return (
		<Grid container spacing={2} sx={{ marginLeft: 5 }}>
			{abuddies.map((buddy, index) => (
				<Grid item xs={6} key={buddy._id}>
					<Card
						sx={{
							maxWidth: '75%',
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.third.main,
							boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
							borderRadius: 4,
						}}
					>
						<CardContent>
							{!isBuddyEditMode || selectedBuddy._id !== buddy._id ? (
								<>
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
									<Box display="flex" justifyContent="space-between">
										<Button
											variant="contained"
											sx={{
												width: '40%',
												color: 'black',
												fontWeight: 'bolder',
												fontFamily: 'Comfortaa',
												borderRadius: 20,
												zIndex: 1,
												'&:hover': {
													backgroundColor: (theme) => theme.palette.fourth.main,
												},
											}}
											color="secondary"
											fullWidth
											onClick={() => handleBuddyEdit(buddy)}
										>
											Edit
										</Button>
										<Button
											variant="contained"
											sx={{
												width: '40%',
												color: 'black',
												fontWeight: 'bolder',
												fontFamily: 'Comfortaa',
												borderRadius: 20,
												zIndex: 1,
												'&:hover': {
													backgroundColor: (theme) => theme.palette.fourth.main,
												},
											}}
											color="primary"
											fullWidth
											onClick={() => handleOpenDialog(buddy._id)}
										>
											Delete
										</Button>
									</Box>
								</>
							) : (
								<>
									<TextField
										label="First Name"
										value={editedBuddy.firstName}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, firstName: e.target.value })}
									/>
									<TextField
										label="Last Name"
										value={editedBuddy.lastName}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, lastName: e.target.value })}
									/>
									<TextField
										label="Relation"
										value={editedBuddy.relation}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, relation: e.target.value })}
									/>
									<PhoneNumberInput
										value={phoneNumber}
										onChange={(value) => {
											setPhoneNumber(value);
											setEditedBuddy({ ...editedBuddy, phoneNumber: value });
										}}
										ref={phoneNumberInputRef}
										sx={{ mb: 2 }}
										size="small"
									/>
									<TextField
										label="Email"
										value={editedBuddy.email}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) => setEditedBuddy({ ...editedBuddy, email: e.target.value })}
									/>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<Button
											variant="contained"
											sx={{
												width: '45%',
												color: 'black',
												fontWeight: 'bolder',
												fontFamily: 'Comfortaa',
												borderRadius: 20,
												zIndex: 1,
												'&:hover': {
													backgroundColor: (theme) => theme.palette.hoverGrey,
												},
											}}
											color="fifth"
											onClick={handleBuddySave}
										>
											Save
										</Button>
										<Button
											variant="contained"
											sx={{
												width: '45%',
												color: 'black',
												fontWeight: 'bolder',
												fontFamily: 'Comfortaa',
												borderRadius: 20,
												zIndex: 1,
												'&:hover': {
													backgroundColor: (theme) => theme.palette.hoverGrey,
												},
											}}
											color="primary"
											onClick={handleBuddyCancel}
										>
											Cancel
										</Button>
									</Box>
								</>
							)}
						</CardContent>
					</Card>
				</Grid>
			))}
			<ConfirmationDialog
				open={dialogOpen}
				handleClose={handleCloseDialog}
				handleConfirm={handleConfirmDialog}
				title="Confirm Delete"
				message="Are you sure you want to delete this contact?"
			/>
		</Grid>
	);
};

export default ABuddyCard;
