import React, { useContext, useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, AppBar, Toolbar } from '@mui/material';
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
import { useTheme } from '@mui/material/styles';

const ProfileCard = () => {
	const { profiles, avatarUrl, profileId, doctors, abuddies, pharmacies } = useContext(ProfileContext);

	const [currentProfile, setCurrentProfile] = useState({ abuddies: [], doctors: [], pharmacy: [] });
	const theme = useTheme();

	useEffect(() => {
		const profile = profiles.find((profile) => profile._id === profileId);
		if (profile) {
			const updatedProfile = {
				...profile,
				doctors: doctors,
				abuddies: abuddies,
				pharmacy: pharmacies,
			};
			setCurrentProfile(updatedProfile);
		}
	}, [profiles, profileId, doctors, abuddies, pharmacies]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Card
					sx={{
						marginTop: 2,
						marginBottom: 1,
						boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
						borderRadius: 4,
					}}
				>
					<AppBar position="sticky" style={{ backgroundColor: theme.palette.third.main,borderRadius: 4 }} elevation={4}>
						<Toolbar>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="h6" component="div" color="#000">
									Hello,{' '}
									{currentProfile ? `${currentProfile.firstName} ${currentProfile.lastName}` : 'User'}
									!
								</Typography>
								{currentProfile && (
									<Typography variant="body2" component="div" color="#000">
										<Box display="flex" alignItems="center">
											<MailIcon />
											<Box ml={1}>{currentProfile.email}</Box>
										</Box>
									</Typography>
								)}
							</Box>
							<Avatar alt="Profile Avatar" src={avatarUrl} sx={{ width: 75, height: 75, m: 2 }} />
						</Toolbar>
					</AppBar>
					<Box position="relative">
						<CardContent sx={{ backgroundColor: 'white' }}>
							{currentProfile && (
								<Grid container>
									<Grid item xs={5}>
										<Typography variant="h5" component="div" mb={1}>
											Pharmacies
										</Typography>
										{currentProfile &&
											currentProfile.pharmacy &&
											currentProfile.pharmacy.map((pharmacy, index) => (
												<div key={index}>
													<Typography variant="h7" component="div">
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
															<Box ml={1}>{formatPhoneNumber(pharmacy.phoneNumber)}</Box>
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

									<Grid item xs={3}>
										<Typography variant="h5" component="div" mb={1}>
											Doctors
										</Typography>
										{currentProfile &&
											currentProfile.doctors &&
											currentProfile.doctors.map((doctor, index) => (
												<div key={index}>
													<Typography variant="h7" component="div">
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
															<Box ml={1}>{formatPhoneNumber(doctor.phoneNumber)}</Box>
														</Box>
													</Typography>
												</div>
											))}
									</Grid>

									<Grid item xs={4}>
										<Typography variant="h5" component="div" mb={1}>
											Emergency Contacts
										</Typography>
										{currentProfile &&
											currentProfile.abuddies &&
											currentProfile.abuddies.map((abuddy, index) => (
												<div key={index}>
													<Typography variant="h7" component="div">
														<Box display="flex" alignItems="center">
															<BuddyIcon />
															<Box ml={1}>
																{abuddy.firstName} {abuddy.lastName}
															</Box>
															<Typography
																variant="body2"
																component="div"
																color="text.secondary"
															>
																<Box display="flex" alignItems="center" ml={2}>
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
															<Box ml={1}>{formatPhoneNumber(abuddy.phoneNumber)}</Box>
														</Box>
													</Typography>
												</div>
											))}
									</Grid>
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
