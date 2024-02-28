import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Typography, Button, Box, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import PharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PhoneIcon from '@mui/icons-material/Phone';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import BuddyIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import RelationIcon from '@mui/icons-material/PeopleOutline';
import Avatar from '@mui/material/Avatar';
import { FaPersonHalfDress } from 'react-icons/fa6';

import { ProfileContext } from '../../../contexts/ProfileContext';
import { formatPhoneNumber } from '../../../helpers/phoneNumberFormat';

const ProfileCard = () => {
	const { profiles, avatarUrl, profileId, updateProfile } = useContext(ProfileContext);

	const currentProfile = profiles.find((profile) => profile._id === profileId);

	const [editedProfile, setEditedProfile] = useState(currentProfile || {});
	const [isProfileEditMode, setIsProfileEditMode] = useState(false);

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
		<Card sx={{ marginTop: 2, marginBottom: 1 }}>
			<CardContent>
				<Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
					Hello, {currentProfile && currentProfile.firstName} {currentProfile.lastName}!
				</Typography>
				{currentProfile && (
					<Grid container>
							{!isProfileEditMode ? (
								<>
									<Grid item xs={8}>
										<Typography variant="h5" component="div">
											<Box display="flex" alignItems="center">
												<AccountCircle />
												<Box ml={1} contentEditable={isProfileEditMode}>
													{currentProfile.firstName} {currentProfile.lastName}
												</Box>
											</Box>
										</Typography>

										<Typography
											variant="body2"
											component="div"
											color="text.secondary"
											sx={{ marginBottom: 2, marginLeft: 1 }}
										>
											<Box display="flex" alignItems="center">
												<MailIcon />
												<Box ml={1} contentEditable={isProfileEditMode}>
													{currentProfile.email}
												</Box>
											</Box>
										</Typography>
									</Grid>

									<Grid item xs={4}>
										<Avatar alt="Profile Avatar" src={avatarUrl} />
									</Grid>

									<Grid item xs={4}>
										<Typography variant="h6" component="div">
											Pharmacies
										</Typography>
										{currentProfile.pharmacy.map((pharmacy, index) => (
											<div key={index}>
												<Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
													<Box display="flex" alignItems="center">
														<PharmacyIcon />
														<Box ml={1}>{pharmacy.name}</Box>
													</Box>
												</Typography>
												<Typography
													variant="body2"
													component="div"
													color="text.secondary"
													sx={{ marginBottom: 2, marginLeft: 1 }}
												>
													<Box display="flex" alignItems="center">
														<PhoneIcon />
														<Box ml={1}>{formatPhoneNumber(pharmacy.phoneNumber)}</Box>
													</Box>
												</Typography>
												<Typography
													variant="body2"
													component="div"
													color="text.secondary"
													sx={{ marginBottom: 2, marginLeft: 1 }}
												>
													<Box display="flex" alignItems="center">
														<HomeIcon />
														<Box ml={1}>{pharmacy.address}</Box>
													</Box>
												</Typography>
											</div>
										))}
									</Grid>

									<Grid item xs={6}>
										<Typography variant="h6" component="div">
											Doctors
										</Typography>
										{currentProfile.doctors.map((doctor, index) => (
											<div key={index}>
												<Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
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
													sx={{ marginBottom: 2, marginLeft: 1 }}
												>
													<Box display="flex" alignItems="center">
														<PhoneIcon />
														<Box ml={1}>{formatPhoneNumber(doctor.phoneNumber)}</Box>
													</Box>
												</Typography>
											</div>
										))}
									</Grid>

									<Grid item xs={6}>
										<Typography variant="h6" component="div">
											Buddies
										</Typography>
										{currentProfile.abuddies.map((abuddy, index) => (
											<div key={index}>
												<Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
													<Box display="flex" alignItems="center">
														<BuddyIcon />
														<Box ml={1}>
															{abuddy.firstName} {abuddy.lastName}
														</Box>
													</Box>
												</Typography>
												<Typography
													variant="body2"
													component="div"
													color="text.secondary"
													sx={{ marginBottom: 2, marginLeft: 1 }}
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
													sx={{ marginBottom: 2, marginLeft: 1 }}
												>
													<Box display="flex" alignItems="center">
														<PhoneIcon />
														<Box ml={1}>{formatPhoneNumber(abuddy.phoneNumber)}</Box>
													</Box>
												</Typography>
												<Typography
													variant="body2"
													component="div"
													color="text.secondary"
													sx={{ marginBottom: 2, marginLeft: 1 }}
												>
													<Box display="flex" alignItems="center">
														<FaPersonHalfDress size={24} />
														<Box ml={1}>{abuddy.relation}</Box>
													</Box>
												</Typography>
											</div>
										))}
									</Grid>

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
										onClick={() => setIsProfileEditMode(!isProfileEditMode)}
									>
										{isProfileEditMode ? 'Save' : 'Edit'}
									</Button>
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
										onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
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
										onClick={handleProfileCancel}
									>
										Cancel
									</Button>
								</>
							)}
					</Grid>
				)}
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
