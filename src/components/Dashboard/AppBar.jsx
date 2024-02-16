import React, { useContext } from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, InputBase } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon, Search as SearchIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StyledAppBar } from '../../styles/mainLayoutStyles';
import { ThemeContext } from '../../contexts/ThemeContext';
// import { UserContext } from '../../contexts/UserContext';
// import { ProfileContext } from '../../contexts/ProfileContext';
import LogoutButton from '../Auth/Logout';
import ProfileSelector from '../Profile/SwitchProfileButton';

function SearchAppBar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	// const { user } = useContext(UserContext);
    // const { profile } = useContext(ProfileContext);

	return (
		<StyledAppBar>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box>
					<LogoutButton />
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box>
				<ProfileSelector />
				</Box>
					<IconButton color="inherit" component={Link} to="/notifications" sx={{ mr: 2 }}>
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" component={Link} to="/profile">
						<Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
					</IconButton>
					<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
					<IconButton color="inherit" onClick={toggleTheme}>
						{theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
					</IconButton>
					<IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</StyledAppBar>
	);
}

export default SearchAppBar;