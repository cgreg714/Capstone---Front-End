import React from 'react';
import { Toolbar, IconButton, Badge, Avatar, Divider, Box, InputBase } from '@mui/material';
import { Notifications as NotificationsIcon, Settings as SettingsIcon, Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StyledAppBar } from '../../../styles/mainLayoutStyles';

function SearchAppBar() {
	return (
		<StyledAppBar>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ mr: 2 }}>
						<IconButton color="inherit">
							<SearchIcon />
						</IconButton>
						<InputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton color="inherit" component={Link} to="/notifications" sx={{ mr: 2 }}>
						<Badge badgeContent={4} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton color="inherit" component={Link} to="/profile">
						<Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
					</IconButton>
					<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
					<IconButton color="inherit" component={Link} to="/settings">
						<SettingsIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</StyledAppBar>
	);
}

export default SearchAppBar;