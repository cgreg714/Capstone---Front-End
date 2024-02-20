import React from 'react';
import { Box } from '@mui/material';
import SearchAppBar from '../components/Dashboard/AppBar';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer';
import Dashboard from './Dashboard';
import Medications from './Medications';
import Drugs from './Drugs';
import Profile from './Profile';
import Settings from './Settings';
import { Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer';

function MainLayout() {
	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<SearchAppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />
			<PermanentDrawerLeft width={drawerWidth} />
			<Box
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					marginLeft: `${drawerWidth}px`,
				}}
			>
				<Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/medications" element={<Medications />} />
						<Route path="/drugs" element={<Drugs />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}

export default MainLayout;