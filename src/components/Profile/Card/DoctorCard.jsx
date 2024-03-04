import React, { useContext, useState, useRef } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';
import PhoneNumberInput from '../PhoneNumberInput';

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
											onClick={() => handleDoctorEdit(doctor)}
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
											onClick={() => handleOpenDialog(doctor._id)}
										>
											Delete
										</Button>
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
											onClick={handleDoctorSave}
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
											onClick={handleDoctorCancel}
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
				message="Are you sure you want to delete this doctor?"
			/>
		</Grid>
	);
};

export default DoctorCard;
