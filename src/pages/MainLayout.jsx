import React from 'react';
import { Box } from '@mui/material';
import SearchAppBar from '../components/Dashboard/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer';
import Dashboard from './Dashboard';
import Medications from './Medications';
import Drugs from './Drugs';
import Profile from './Profile';
import { Routes, Route } from 'react-router-dom';

function MainLayout() {
	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<PermanentDrawerLeft />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: `${drawerWidth}px`,
					flexGrow: 1,
				}}
			>
				<SearchAppBar />
				<Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/medications" element={<Medications />} />
						<Route path="/drugs" element={<Drugs />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<Medications />} />
					</Routes>
				</Box>
			</Box>
		</Box>
	);
}

export default MainLayout;