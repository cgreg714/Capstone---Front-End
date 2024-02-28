import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box } from '@mui/material';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';

const PharmacyCard = () => {
	const { pharmacies, updatePharmacy } = useContext(ProfileContext);

	// Assuming pharmacies is an array, we need to select one pharmacy to edit
	const [selectedPharmacy, setSelectedPharmacy] = useState(null);
	const [editedPharmacy, setEditedPharmacy] = useState(null);
	const [isPharmacyEditMode, setIsPharmacyEditMode] = useState(false);

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
		<div>
			{pharmacies.map((pharmacy) => (
				<Card key={pharmacy._id} sx={{ maxWidth: 250, marginTop: 2, marginBottom: 1 }}>
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
			))}
		</div>
	);
};

export default PharmacyCard;
