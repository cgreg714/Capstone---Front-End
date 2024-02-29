import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';

const PharmacyCard = () => {
	const { pharmacies, updatePharmacy } = useContext(ProfileContext);

	// Assuming pharmacies is an array, we need to select one pharmacy to edit
	const [selectedPharmacy, setSelectedPharmacy] = useState(null);
	const [editedPharmacy, setEditedPharmacy] = useState(null);
	const [isPharmacyEditMode, setIsPharmacyEditMode] = useState(false);
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

	return (
		<Grid container spacing={2}sx={{ marginLeft: 5 }}>
			{pharmacies.map((pharmacy, index) => (
				<Grid item xs={3} key={pharmacy._id}>
					<Card
						sx={{
							maxWidth: 250,
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.cardBackground,
						}}
					>
						<CardContent>
							{!isPharmacyEditMode || selectedPharmacy._id !== pharmacy._id ? (
								<div>
									<Typography variant="h5" component="div">
										<Box display="flex" alignItems="center">
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
								</div>
							) : (
								<div>
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
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default PharmacyCard;
