import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';

const PharmacyCard = () => {
	const { pharmacies, updatePharmacy, deletePharmacy } = useContext(ProfileContext);

	// Assuming pharmacies is an array, we need to select one pharmacy to edit
	const [selectedPharmacy, setSelectedPharmacy] = useState(null);
	const [editedPharmacy, setEditedPharmacy] = useState(null);
	const [isPharmacyEditMode, setIsPharmacyEditMode] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pharmacyIdToDelete, setPharmacyIdToDelete] = useState(null);
	const theme = useTheme();

	const handlePharmacyEdit = (pharmacy) => {
		setSelectedPharmacy(pharmacy);
		setEditedPharmacy({ ...pharmacy });
		setIsPharmacyEditMode(true);
	};

	const handlePharmacySave = () => {
		if (editedPharmacy) {
			updatePharmacy(selectedPharmacy._id, editedPharmacy);
			setIsPharmacyEditMode(false);
		}
	};

	const handlePharmacyCancel = () => {
		setIsPharmacyEditMode(false);
		setEditedPharmacy(null);
		setSelectedPharmacy(null);
	};

	const handleOpenDialog = (pharmacyId) => {
		setPharmacyIdToDelete(pharmacyId);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleConfirmDialog = () => {
		if (pharmacyIdToDelete) {
			deletePharmacy(pharmacyIdToDelete);
			setDialogOpen(false);
			setPharmacyIdToDelete(null);
		}
	};

	return (
		<Grid container sx={{ marginLeft: 5 }}>
			{pharmacies.map((pharmacy, index) => (
				<Grid item xs={6} key={pharmacy._id}>
					<Card
						sx={{
							maxWidth: 300,
							marginTop: 2,
							backgroundColor: theme.palette.cardBackground,
						}}
					>
						<CardContent>
							{!isPharmacyEditMode || selectedPharmacy._id !== pharmacy._id ? (
								<>
									<Typography variant="h5" component="div">
										<Box display="flex" alignItems="center" mb={2}>
											<PharmacyIcon />
											<Box ml={1}>{pharmacy.name}</Box>
										</Box>
									</Typography>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<PhoneIcon />
										<Box ml={1}>{formatPhoneNumber(pharmacy.phoneNumber)}</Box>
									</Box>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<HomeIcon />
										<Box ml={1}>
											<Typography display="block">{pharmacy.address.street}</Typography>
											<Typography display="block">
												{pharmacy.address.city}, {pharmacy.address.state} {pharmacy.address.zip}
											</Typography>
										</Box>
									</Box>
									<Box display="flex" justifyContent="space-between">
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
											onClick={() => handlePharmacyEdit(pharmacy)}
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
											onClick={() => handleOpenDialog(pharmacy._id)}
										>
											Delete
										</Button>
									</Box>
								</>
							) : (
								<>
									<TextField
										label="Name"
										value={editedPharmacy.name}
										onChange={(e) => setEditedPharmacy({ ...editedPharmacy, name: e.target.value })}
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
										onClick={handlePharmacySave}
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
										onClick={handlePharmacyCancel}
									>
										Cancel
									</Button>
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
				message="Are you sure you want to delete this pharmacy?"
			/>
		</Grid>
	);
};

export default PharmacyCard;
