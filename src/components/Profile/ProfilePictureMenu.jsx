import React, { useState, useContext } from 'react';
import { Avatar, IconButton, Menu, Box } from '@mui/material';
import LogoutButton from '../Auth/Logout';
import ProfileSelector from './SwitchProfileButton';
import { ProfileContext } from '../../contexts/ProfileContext';

const ProfileMenu = () => {
    const { avatarUrl } = useContext(ProfileContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <Avatar
                    alt="Profile Picture"
                    src={avatarUrl || "/static/images/avatar/1.jpg"}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <ProfileSelector onClose={handleClose} />
                <Box display="flex" justifyContent="center">
                    <LogoutButton onClose={handleClose} />
                </Box>
            </Menu>
        </>
    );
};

export default ProfileMenu;