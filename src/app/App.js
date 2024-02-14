import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, CssBaseline } from '@mui/material';

import MainLayout from '../pages/MainLayout';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';

import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext, UserProvider } from '../contexts/UserContext';
import { ProfileContext, ProfileProvider } from '../contexts/ProfileContext';
import { DrugProvider } from '../contexts/DrugContext';

import { lightTheme, darkTheme } from '../theme/theme';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { userId, isLoading, logout } = useContext(UserContext);
	const { profileId } = useContext(ProfileContext);

	useEffect(() => {
		if (!isLoading && !userId) {
			logout();
			navigate('/login');
		// } else if (!profileId) {
		// 	navigate('/profile');
		}
	}, [userId, navigate, isLoading, logout, profileId]);

	if (isLoading || !userId) {
		return null;
	}

	return children;
};

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
										<Routes>
											<Route path="/login" element={<LoginPage />} />
											<Route path="/signup" element={<SignupPage />} />
											<Route
												path="*"
												element={
													<ProtectedRoute>
														<MainLayout />
													</ProtectedRoute>
												}
											/>
										</Routes>
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