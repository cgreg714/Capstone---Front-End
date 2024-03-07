import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ContextProviders } from './AppContexts';
import { AppRoutes } from './AppRoutes';
import { lightTheme, darkTheme } from '../theme/theme';
import api from '../api';

function App() {
	const [error, setError] = useState(null);
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
        const checkToken = async () => {
            try {
                await api.get('/check-token');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('profileId');
                }
            }
        };

        checkToken();
    }, []);

	return (
		<ThemeProvider theme={theme === 'dark' ? lightTheme : darkTheme}>
			<CssBaseline />
			<ContextProviders error={error} setError={setError} theme={theme} toggleTheme={toggleTheme}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Router>
						<AppRoutes />
					</Router>
				</LocalizationProvider>
			</ContextProviders>
		</ThemeProvider>
	);
}

export default App;