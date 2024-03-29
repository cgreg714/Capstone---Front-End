import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ContextProviders } from './AppContexts';
import { AppRoutes } from './AppRoutes';
import { lightTheme, darkTheme } from '../theme/theme';
import api from '../api';
import LoadingScreen from '../components/Loading/LoadingScreen';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

	useEffect(() => {
		const checkToken = async () => {
			try {
				await api.get('/check-token');
				setLoading(false);
			} catch (error) {
				if (error.response && error.response.status === 401) {
					localStorage.removeItem('profileId');
				}
				setLoading(false);
			}
		};

		checkToken();
	}, []);

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			<CssBaseline />
			<ContextProviders error={error} setError={setError} theme={theme} setTheme={toggleTheme}>
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
