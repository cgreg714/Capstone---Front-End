import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import BuddyIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import { FaPersonHalfDress } from 'react-icons/fa6';

import { ProfileContext } from '../../../contexts/ProfileContext';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';

const ProfileCard = () => {
	const { profiles, avatarUrl, profileId, updateProfile, updatedPharmacy, updatedDoctor, updatedAbuddy } =
		useContext(ProfileContext);

	const [currentProfile, setCurrentProfile] = useState();
	const [editedProfile, setEditedProfile] = useState({});
	const [isProfileEditMode, setIsProfileEditMode] = useState(false);

	useEffect(() => {
		const profile = profiles.find((profile) => profile._id === profileId);
		setCurrentProfile(profile);
		setEditedProfile(profile || {});
	}, [profiles, profileId, updatedPharmacy, updatedDoctor, updatedAbuddy]);

	const handleProfileSave = () => {
		if (editedProfile) {
			updateProfile(profileId, editedProfile);
			setIsProfileEditMode(false);
		}
	};

	const handleProfileCancel = () => {
		setIsProfileEditMode(false);
		setEditedProfile(currentProfile || {});
	};

	return (
		<Grid container justifyContent="center">
			<Grid item xs={8}>
				<Card sx={{ marginTop: 2, marginBottom: 1 }}>
					<Box position="relative">
						<Avatar
							alt="Profile Avatar"
							src={avatarUrl}
							sx={{ width: 100, height: 100, position: 'absolute', top: 20, right: 40 }}
						/>
						<CardContent>
							{currentProfile && (
								<Grid container>
									{!isProfileEditMode ? (
										<>
											<Grid item xs={12}>
												<Typography
													variant="h4"
													component="div"
													sx={{ textAlign: 'center', mb: 1 }}
												>
													Hello, {currentProfile && currentProfile.firstName}{' '}
													{currentProfile.lastName}!
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography
													variant="body2"
													component="div"
													color="text.secondary"
													sx={{ mb: 6, textAlign: 'center' }}
												>
													<Box display="flex" alignItems="center" justifyContent="center">
														<MailIcon />
														<Box ml={1} contentEditable={isProfileEditMode}>
															{currentProfile.email}
														</Box>
													</Box>
												</Typography>
											</Grid>

											<Grid item xs={4}>
												<Typography variant="h6" component="div">
													Pharmacies
												</Typography>
												{currentProfile.pharmacy.map((pharmacy, index) => (
													<div key={index}>
														<Typography
															variant="h6"
															component="div"
															sx={{ marginBottom: 1 }}
														>
															<Box display="flex" alignItems="center">
																<PharmacyIcon />
																<Box ml={1}>{pharmacy.name}</Box>
															</Box>
														</Typography>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<PhoneIcon />
																<Box ml={1}>
																	{formatPhoneNumber(pharmacy.phoneNumber)}
																</Box>
															</Box>
														</Typography>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<HomeIcon />
																<Box ml={1}>
																	{pharmacy.address.street}, {pharmacy.address.city},{' '}
																	{pharmacy.address.state} {pharmacy.address.zip}
																</Box>
															</Box>
														</Typography>
													</div>
												))}
											</Grid>

											<Grid item xs={4}>
												<Typography variant="h6" component="div">
													Doctors
												</Typography>
												{currentProfile.doctors.map((doctor, index) => (
													<div key={index}>
														<Typography
															variant="h6"
															component="div"
															sx={{ marginBottom: 1 }}
														>
															<Box display="flex" alignItems="center">
																<DoctorIcon />
																<Box ml={1}>
																	{doctor.firstName} {doctor.lastName}
																</Box>
															</Box>
														</Typography>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<PhoneIcon />
																<Box ml={1}>
																	{formatPhoneNumber(doctor.phoneNumber)}
																</Box>
															</Box>
														</Typography>
													</div>
												))}
											</Grid>

											<Grid item xs={4}>
												<Typography variant="h6" component="div">
													Buddies
												</Typography>
												{currentProfile.abuddies.map((abuddy, index) => (
													<div key={index}>
														<Typography
															variant="h6"
															component="div"
															sx={{ marginBottom: 1 }}
														>
															<Box display="flex" alignItems="center">
																<BuddyIcon />
																<Box ml={1}>
																	{abuddy.firstName} {abuddy.lastName}
																</Box>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<FaPersonHalfDress size={24} />
																<Box ml={1}>{abuddy.relation}</Box>
															</Box>
														</Typography>
															</Box>
														</Typography>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<MailIcon />
																<Box ml={1}>{abuddy.email}</Box>
															</Box>
														</Typography>
														<Typography
															variant="body2"
															component="div"
															color="text.secondary"
															sx={{ m: 2 }}
														>
															<Box display="flex" alignItems="center">
																<PhoneIcon />
																<Box ml={1}>
																	{formatPhoneNumber(abuddy.phoneNumber)}
																</Box>
															</Box>
														</Typography>
													</div>
												))}
											</Grid>
											<Grid container justifyContent="center" sx={{ marginTop: 2 }}>
												<Grid item xs={12}>
													<Button
														variant="contained"
														sx={{
															width: '100%',
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
														onClick={() => setIsProfileEditMode(!isProfileEditMode)}
													>
														{isProfileEditMode ? 'Save' : 'Edit'}
													</Button>
												</Grid>
											</Grid>
										</>
									) : (
										<>
											<TextField
												label="First Name"
												value={editedProfile.firstName}
												onChange={(e) =>
													setEditedProfile({ ...editedProfile, firstName: e.target.value })
												}
												sx={{ marginBottom: 2 }}
											/>
											<TextField
												label="Last Name"
												value={editedProfile.lastName}
												onChange={(e) =>
													setEditedProfile({ ...editedProfile, lastName: e.target.value })
												}
												sx={{ marginBottom: 2 }}
											/>
											<TextField
												label="Email"
												value={editedProfile.email}
												onChange={(e) =>
													setEditedProfile({ ...editedProfile, email: e.target.value })
												}
												sx={{ marginBottom: 2 }}
											/>

											<Button
												variant="contained"
												color="secondary"
												sx={{
													width: '30%',
													color: 'black',
													fontWeight: 'bolder',
													fontFamily: 'Comfortaa',
													zIndex: 1,
													borderRadius: 20,
													marginRight: 4,
													'&:hover': {
														backgroundColor: (theme) => theme.palette.hoverGrey,
													},
												}}
												onClick={handleProfileSave}
											>
												Save
											</Button>
											<Button
												variant="contained"
												color="secondary"
												sx={{
													width: '100%',
													color: 'black',
													fontWeight: 'bolder',
													fontFamily: 'Comfortaa',
													borderRadius: 20,
													zIndex: 1,
													'&:hover': {
														backgroundColor: (theme) => theme.palette.hoverGrey,
													},
												}}
												onClick={handleProfileCancel}
											>
												Cancel
											</Button>
										</>
									)}
								</Grid>
							)}
						</CardContent>
					</Box>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ProfileCard;
