import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Card, CardContent, Typography, Avatar, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileSelectionPage = () => {
	const { profiles, isLoading, setProfileId, getProfile } = useContext(ProfileContext);
	const navigate = useNavigate();

	const handleProfileSelect = (profileId) => {
		setProfileId(profileId);
		getProfile(profileId);
		localStorage.setItem('profileId', profileId);
		navigate('/dashboard');
	};

    useEffect(() => {
        if (profiles.length === 1) {
            handleProfileSelect(profiles[0]._id);
        }
    }, [profiles]);

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Card>
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
								<Card sx={{ backgroundColor: '#717171' }}>
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
