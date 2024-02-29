import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';
import { ProfileContext } from '../../../contexts/ProfileContext';
import { useTheme } from '@mui/material/styles';

const DoctorCard = () => {
	const { doctors, updateDoctor } = useContext(ProfileContext);

	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [editedDoctor, setEditedDoctor] = useState(null);
	const [isDoctorEditMode, setIsDoctorEditMode] = useState(false);
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

	return (
		<Grid container spacing={2}sx={{ marginLeft: 5 }}>
			{doctors.map((doctor, index) => (
				<Grid item xs={3} key={doctor._id}>
					<Card
						sx={{
							maxWidth: 250,
							marginTop: 2,
							marginBottom: 1,
							backgroundColor: theme.palette.cardBackground,
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
										sx={{ marginBottom: 2, marginLeft: 1 }}
									>
										<PhoneIcon />
										<Box ml={1}>{formatPhoneNumber(doctor.phoneNumber)}</Box>
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
										onClick={() => handleDoctorEdit(doctor)}
									>
										Edit
									</Button>
								</>
							) : (
								<>
									<TextField
										label="First Name"
										value={editedDoctor.firstName}
										onChange={(e) =>
											setEditedDoctor({ ...editedDoctor, firstName: e.target.value })
										}
									/>
									<TextField
										label="Last Name"
										value={editedDoctor.lastName}
										onChange={(e) => setEditedDoctor({ ...editedDoctor, lastName: e.target.value })}
									/>
									<TextField
										label="Phone Number"
										value={editedDoctor.phoneNumber}
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
		</Grid>
	);
};

export default DoctorCard;
