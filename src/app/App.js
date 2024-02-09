import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, CssBaseline } from '@mui/material';

import MainLayout from '../pages/MainLayout';

import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserProvider } from '../contexts/UserContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { DrugProvider } from '../contexts/DrugContext';

import { lightTheme, darkTheme } from '../theme/theme';

function App() {
	const [error, setError] = useState(null);
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeProvider theme={theme === 'dark' ? lightTheme : darkTheme}>
			<CssBaseline />
			<ErrorContext.Provider value={{ error, setError }}>
				<ThemeContext.Provider value={{ theme, toggleTheme }}>
					<DrugProvider>
						<UserProvider>
							<ProfileProvider>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Router>
										<MainLayout />
									</Router>
								</LocalizationProvider>
							</ProfileProvider>
						</UserProvider>
					</DrugProvider>
				</ThemeContext.Provider>
			</ErrorContext.Provider>
		</ThemeProvider>
	);
}

export default App;
