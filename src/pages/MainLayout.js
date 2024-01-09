import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchAppBar from './dashboard/appBar/appBar';
import { PermanentDrawerLeft } from './dashboard/drawer/Drawer';
import Dashboard from './Dashboard';
function MainLayout() {
	const drawerWidth = 240;
	const [selectedMenu, setSelectedMenu] = useState('Dashboard');

	const renderSelectedComponent = () => {
		switch (selectedMenu) {
			case 'Dashboard':
				return <Dashboard />;
			default:
				return null;
		}
	};

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<PermanentDrawerLeft setSelectedMenu={setSelectedMenu} />
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
					{renderSelectedComponent()}
				</Box>
			</Box>
		</Box>
	);
}

export default MainLayout;