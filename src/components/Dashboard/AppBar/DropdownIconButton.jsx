import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Avatar, List, ListItem } from '@mui/material';
import ProfileSelector from '../../Profile/SwitchProfileButton';
import { ProfileContext } from '../../../contexts/ProfileContext';
// import { selectedMenu, setSelectedMenu } from './src/pages/MainLayout'

export default function DropdownIconButton() {
    // const profileName = null;

    const { avatarUrl } = useContext(ProfileContext);
    const [anchorEl, setAnchor] = useState(null);
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const { profiles, profileId } = useContext(ProfileContext);
    const currentProfile = profiles.find((profile) => profile._id === profileId);

    // const stateChange = () => {
    //     this.setSelectedMenu = 'Profile'
    // }

    return (
        <div>
            <IconButton onClick={handleClick}> 
            <Avatar
                    alt="Profile Picture"
                    src={avatarUrl || "/static/images/avatar/1.jpg"}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
            >
                <MenuItem style={{display: 'flex', margin: 'auto', marginTop: 0}}>
                    <Avatar 
                    onClick={handleClose} 
                    component={Link} to="/profile" 
                    style={{alignItems: 'top'}}
                    alt="Profile Picture"
                    src={avatarUrl || "/static/images/avatar/1.jpg"}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    />
                    {currentProfile && (
                        <List component="div">
                        <h4 style={{paddingLeft: 13, paddingTop: 0, margin: 'auto'}}>{currentProfile.firstName} {currentProfile.lastName} </h4>
                        <ListItem button onClick={handleClose} component={Link} to="/profile/">
                            <ProfileSelector />
                        </ListItem>
                    </List>
                    )}
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/profile">Profile Settings</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/logout">Log Out</MenuItem>
            </Menu>
        </div>
    );
}