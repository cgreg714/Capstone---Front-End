import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Settings() {
	// eslint-disable-next-line
	const [active, setActive] = useState('GeneralCard');
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<Box>
				<Button component={Link} to="/profile">
					Profile Settings
				</Button>
				<Button variant="contained" onClick={toggleTheme}>Switch to {theme === 'light' ? 'Light' : 'Dark'} Theme</Button>
			</Box>
			<Box>{active === 'GeneralCard' && <SettingCard />}</Box>
		</>
	);
}

export function SettingCard() {
	return (
		<div>
			<h2>Email</h2>
			<p>Email here</p>

			<h2>Username</h2>
			<p>Username here</p>

			<h3>Change Password</h3>
		</div>
	);
}
