import React, { useContext, useState, useRef } from 'react';
import { Card, CardContent, TextField, Typography, Box, Grid } from '@mui/material';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';
import PhoneNumberInput from '../PhoneNumberInput';
import { Styled3DButtonRed, Styled3DButtonYellow, Styled3DButtonGreen } from '../../../styles/mainLayoutStyles';

const DoctorCard = () => {
	const { doctors, updateDoctor, deleteDoctor } = useContext(ProfileContext);

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [editedDoctor, setEditedDoctor] = useState(null);
	const [isDoctorEditMode, setIsDoctorEditMode] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [doctorIdToDelete, setDoctorIdToDelete] = useState(null);
	const theme = useTheme();
	const [phoneNumber, setPhoneNumber] = useState('');
	const phoneNumberInputRef = useRef(null);

	const handleDoctorEdit = (doctor) => {
		setSelectedDoctor(doctor);
		setEditedDoctor({ ...doctor });
		setPhoneNumber(doctor.phoneNumber);
		setIsDoctorEditMode(true);
	};

	const handleDoctorSave = () => {
		if (editedDoctor) {
			updateDoctor(selectedDoctor._id, editedDoctor);
			setIsDoctorEditMode(false);
		}
	};

	const handleDoctorCancel = () => {
		setIsDoctorEditMode(false);
		setEditedDoctor(null);
		setSelectedDoctor(null);
	};

	const handleOpenDialog = (doctorId) => {
		setDoctorIdToDelete(doctorId);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleConfirmDialog = () => {
		if (doctorIdToDelete) {
			deleteDoctor(doctorIdToDelete);
			setDialogOpen(false);
			setDoctorIdToDelete(null);
		}
	};

	return (
		<Grid container spacing={2}>
			{doctors.map((doctor, index) => (
				<Grid item xs={6} key={doctor._id}>
					<Card
						sx={{
							maxWidth: 300,
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.third.main,
							boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
							borderRadius: 4,
						}}
					>
						<CardContent>
							{!isDoctorEditMode || selectedDoctor._id !== doctor._id ? (
								<>
									<Typography variant="h5" component="div">
										<Box display="flex" alignItems="center">
											<DoctorIcon />
											<Box ml={1}>
												{doctor.firstName} {doctor.lastName}
											</Box>
										</Box>
									</Typography>
									<Box
										display="flex"
										alignItems="center"
										color="text.secondary"
										sx={{ marginBottom: 3, marginLeft: 1 }}
									>
										<PhoneIcon />
										<Box ml={1}>{formatPhoneNumber(doctor.phoneNumber)}</Box>
									</Box>
									<Box display="flex" justifyContent="space-between" sx={{ marginBottom: -2 }}>
										<Styled3DButtonYellow
											variant="contained"
											sx={{ width: '40%'}}
											fullWidth
											onClick={() => handleDoctorEdit(doctor)}
										>
											Edit
										</Styled3DButtonYellow>
										<Styled3DButtonRed
											variant="contained"
											sx={{ width: '40%'}}
											fullWidth
											onClick={() => handleOpenDialog(doctor._id)}
										>
											Delete
										</Styled3DButtonRed>
									</Box>
								</>
							) : (
								<>
									<TextField
										label="First Name"
										value={editedDoctor.firstName}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedDoctor({ ...editedDoctor, firstName: e.target.value })
										}
									/>
									<TextField
										label="Last Name"
										value={editedDoctor.lastName}
										size="small"
										sx={{ mb: 2 }}
										onChange={(e) => setEditedDoctor({ ...editedDoctor, lastName: e.target.value })}
									/>
									<PhoneNumberInput
										value={phoneNumber}
										onChange={(value) => {
											setPhoneNumber(value);
											setEditedDoctor({ ...editedDoctor, phoneNumber: value });
										}}
										ref={phoneNumberInputRef}
										sx={{ mb: 2 }}
										size="small"
									/>
									<Box display="flex" justifyContent="space-between">
										<Styled3DButtonGreen
											variant="contained"
											sx={{ width: '45%' }}
											fullWidth
											onClick={handleDoctorSave}
										>
											Save
										</Styled3DButtonGreen>
										<Styled3DButtonRed
											variant="contained"
											sx={{ width: '45%' }}
											fullWidth
											onClick={handleDoctorCancel}
										>
											Cancel
										</Styled3DButtonRed>
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
				message="Are you sure you want to delete this doctor?"
			/>
		</Grid>
	);
};

export default DoctorCard;
