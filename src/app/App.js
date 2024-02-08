import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, CssBaseline } from '@mui/material';

import MainLayout from '../pages/MainLayout';
import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';
import { lightTheme, darkTheme } from '../theme/theme';

function App() {
	const [error, setError] = useState(null);
	const [theme, setTheme] = useState('light');
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ProfileContext.Provider value={{ profile, setProfile }}>
				<ThemeContext.Provider value={{ theme, toggleTheme }}>
					<ErrorContext.Provider value={{ error, setError }}>
						<ThemeProvider theme={theme === 'dark' ? lightTheme : darkTheme}>
							<CssBaseline />
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Router>
									<MainLayout />
								</Router>
							</LocalizationProvider>
						</ThemeProvider>
					</ErrorContext.Provider>
				</ThemeContext.Provider>
			</ProfileContext.Provider>
		</UserContext.Provider>
	);
}

export default App;