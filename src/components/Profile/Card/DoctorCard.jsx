import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';
import ConfirmationDialog from './ConfirmationDialog';

const DoctorCard = () => {
	const { doctors, updateDoctor, deleteDoctor } = useContext(ProfileContext);

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [editedDoctor, setEditedDoctor] = useState(null);
	const [isDoctorEditMode, setIsDoctorEditMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [doctorIdToDelete, setDoctorIdToDelete] = useState(null);
    const theme = useTheme();

	const handleDoctorEdit = (doctor) => {
		setSelectedDoctor(doctor);
		setEditedDoctor({ ...doctor });
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
		<Grid container spacing={2} sx={{ marginLeft: 5 }}>
			{doctors.map((doctor, index) => (
				<Grid item xs={6} key={doctor._id}>
					<Card
						sx={{
							maxWidth: 250,
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.third.main,
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
										{' '}
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
										size='small'
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedDoctor({ ...editedDoctor, firstName: e.target.value })
										}
									/>
									<TextField
										label="Last Name"
										value={editedDoctor.lastName}
										size='small'
										sx={{ mb: 2 }}

										onChange={(e) => setEditedDoctor({ ...editedDoctor, lastName: e.target.value })}
									/>
									<TextField
										label="Phone Number"
										value={editedDoctor.phoneNumber}
										size='small'
										sx={{ mb: 2 }}
										onChange={(e) =>
											setEditedDoctor({ ...editedDoctor, phoneNumber: e.target.value })
										}
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
										onClick={handleDoctorSave}
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
										onClick={handleDoctorCancel}
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
				message="Are you sure you want to delete this doctor?"
			/>
		</Grid>
	);
};

export default DoctorCard;
