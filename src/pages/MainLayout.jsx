import React from 'react';
import { Box } from '@mui/material';
import { PermanentDrawerLeft } from '../components/Dashboard/Drawer';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Dashboard/Footer';
import SearchAppBar from '../components/Dashboard/AppBar/AppBar';

function MainLayout({ children }) {
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
					{children || <Outlet />}
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}

export default MainLayout;