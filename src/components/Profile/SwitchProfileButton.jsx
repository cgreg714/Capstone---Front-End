import React, { useContext, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

const ProfileSelector = () => {
	const { profiles, setProfileId } = useContext(ProfileContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleProfileSelect = (id) => {
		setProfileId(id);
		localStorage.setItem('profileId', id);
		handleClose();
	};

	return (
		<>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained">
				Select Profile
			</Button>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{profiles.map((profile) => (
					<MenuItem key={profile._id} onClick={() => handleProfileSelect(profile._id)}>
						{profile.firstName + ' ' + profile.lastName}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default ProfileSelector;
