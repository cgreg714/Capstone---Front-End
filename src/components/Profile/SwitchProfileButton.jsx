import React, { useContext, useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';

const ProfileSelector = () => {
	const { profiles, setProfileId, getProfile } = useContext(ProfileContext);
	const navigate = useNavigate();
	const [selectedProfile, setSelectedProfile] = React.useState('');

	useEffect(() => {
		const storedProfileId = localStorage.getItem('profileId');
		if (storedProfileId) {
			setSelectedProfile(storedProfileId);
		}
	}, []);

	const handleProfileSelect = (event) => {
		const id = event.target.value;
		setProfileId(id);
		getProfile(id);
		localStorage.setItem('profileId', id);
		setSelectedProfile(id);
	};

	if (profiles.length === 0) {
		return <MenuItem onClick={() => navigate('/profile')} style={{margin: 0}}>Create Profile</MenuItem>;
	}

	return (
		<Box sx={{ padding: 0 }}>
			<FormControl sx={{ minWidth: 150}}>
				<InputLabel id="profile-selector-label">Select Profile</InputLabel>
				<Select
					labelId="profile-selector-label"
					label="Select Profile"
					value={selectedProfile}
					onChange={handleProfileSelect}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{profiles.map((profile) => (
						<MenuItem key={profile._id} value={profile._id}>
							{profile.firstName + ' ' + profile.lastName}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default ProfileSelector;