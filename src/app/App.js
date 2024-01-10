import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import MainLayout from '../pages/MainLayout';

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Router>
				<MainLayout />
			</Router>
		</LocalizationProvider>
	);
}

export default App;