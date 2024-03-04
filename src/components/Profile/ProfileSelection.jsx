import React, { useContext, useEffect, useCallback } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Card, CardContent, Typography, Avatar, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const ProfileSelectionPage = () => {
	const { profiles, setProfileId, getProfile } = useContext(ProfileContext);
	const navigate = useNavigate();
	const theme = useTheme();

	const handleProfileSelect = useCallback(
		(profileId) => {
			setProfileId(profileId);
			getProfile(profileId);
			localStorage.setItem('profileId', profileId);
			navigate('/dashboard');
		},
		[setProfileId, getProfile, navigate]
	);

	useEffect(() => {
		if (profiles.length === 1) {
			handleProfileSelect(profiles[0]._id);
		}
	}, [profiles, handleProfileSelect]);

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Card sx={{ backgroundColor: theme.palette.secondary.main }}>
				<CardContent>
					<Typography variant="h4" component="div" align="center" gutterBottom>
						Select Profile
					</Typography>
					<Grid container justifyContent="center">
						{profiles.map((profile) => (
							<Box
								key={profile._id}
								onClick={() => handleProfileSelect(profile._id)}
								sx={{
									m: 2,
									cursor: 'pointer',
									transition: 'transform 0.3s ease-in-out',
									'&:hover': {
										transform: 'scale(1.1)',
									},
								}}
							>
								<Card sx={{ backgroundColor: theme.palette.primary.main }}>
									<Grid container direction="column" alignItems="center">
										<Avatar
											src={profile.avatar}
											alt={`${profile.firstName} ${profile.lastName}`}
											sx={{ width: 56, height: 56, mt: 2 }}
										/>
										<CardContent>
											<Typography
												variant="h5"
												component="div"
											>{`${profile.firstName} ${profile.lastName}`}</Typography>
										</CardContent>
									</Grid>
								</Card>
							</Box>
						))}
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ProfileSelectionPage;
