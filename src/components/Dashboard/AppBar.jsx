import React, { useContext } from 'react';
import { Toolbar, IconButton, Badge, Divider, Box } from '@mui/material';
import {
	Notifications as NotificationsIcon,
	Settings as SettingsIcon,
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StyledAppBar } from '../../styles/mainLayoutStyles';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ProfileContext } from '../../contexts/ProfileContext';
import ProfileMenu from '../Profile/ProfilePictureMenu';

function SearchAppBar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { notifications } = useContext(ProfileContext);

	return (
		<StyledAppBar>
			<Toolbar>
				<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
					<IconButton color="inherit" component={Link} to="/notifications" sx={{ mr: 2 }}>
						<Badge badgeContent={notifications.length} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<ProfileMenu />
					<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
					<IconButton color="inherit" onClick={toggleTheme}>
						{theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
					</IconButton>
					{/* <IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton> */}
				</Box>
			</Toolbar>
		</StyledAppBar>
	);
}

export default SearchAppBar;