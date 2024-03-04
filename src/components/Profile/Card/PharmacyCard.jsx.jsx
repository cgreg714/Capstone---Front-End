import React, { useContext, useState, useRef } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';
import PhoneNumberInput from '../PhoneNumberInput';

const PharmacyCard = () => {
	const { pharmacies, updatePharmacy, deletePharmacy } = useContext(ProfileContext);

	const [selectedPharmacy, setSelectedPharmacy] = useState(null);
	const [editedPharmacy, setEditedPharmacy] = useState(null);
	const [isPharmacyEditMode, setIsPharmacyEditMode] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [pharmacyIdToDelete, setPharmacyIdToDelete] = useState(null);
	const theme = useTheme();
	const [phoneNumber, setPhoneNumber] = useState('');
	const phoneNumberInputRef = useRef(null);

	const handlePharmacyEdit = (pharmacy) => {
		setSelectedPharmacy(pharmacy);
		setEditedPharmacy({ ...pharmacy });
		setPhoneNumber(pharmacy.phoneNumber);
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
		<Grid container spacing={2} sx={{ marginLeft: 5 }}>
			{pharmacies.map((pharmacy, index) => (
				<Grid item xs={6} key={pharmacy._id}>
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
										sx={{ mb: 2 }}
										onChange={(e) => setEditedPharmacy({ ...editedPharmacy, name: e.target.value })}
									/>
									<PhoneNumberInput
										value={phoneNumber}
										onChange={(value) => {
											setPhoneNumber(value);
											setEditedPharmacy({ ...editedPharmacy, phoneNumber: value });
										}}
										ref={phoneNumberInputRef}
										sx={{ mb: 2 }}
										size="small"
									/>
									<TextField
										label="Street"
										value={editedPharmacy.address.street}
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedPharmacy({
												...editedPharmacy,
												address: { ...editedPharmacy.address, street: e.target.value },
											})
										}
									/>
									<TextField
										label="City"
										value={editedPharmacy.address.city}
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedPharmacy({
												...editedPharmacy,
												address: { ...editedPharmacy.address, city: e.target.value },
											})
										}
									/>
									<TextField
										label="State"
										value={editedPharmacy.address.state}
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedPharmacy({
												...editedPharmacy,
												address: { ...editedPharmacy.address, state: e.target.value },
											})
										}
									/>
									<TextField
										label="Zip"
										value={editedPharmacy.address.zip}
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedPharmacy({
												...editedPharmacy,
												address: { ...editedPharmacy.address, zip: e.target.value },
											})
										}
									/>

									<Box display="flex" justifyContent="space-between">
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
											fullWidth
											onClick={handlePharmacySave}
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
											fullWidth
											onClick={handlePharmacyCancel}
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
				message="Are you sure you want to delete this pharmacy?"
			/>
		</Grid>
	);
};

export default PharmacyCard;
