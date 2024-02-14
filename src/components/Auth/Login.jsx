import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Box, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { login } from '../../api/loginAPI';
import { UserContext } from '../../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginComponent = () => {
	const identifierRef = useRef();
	const passwordRef = useRef();
	const { setUserId, fetchUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		let decodedToken;
		let userId;

		try {
			const token = localStorage.getItem('token');
			if (token) {
				decodedToken = jwtDecode(token);
				userId = decodedToken?._id;
			}
		} catch (error) {
			console.error('Failed to decode token:', error);
		}

		if (userId) {
			setUserId(userId);
			fetchUser(userId)
				.then((user) => {
					if (user.profiles.length === 0) {
						navigate('/profile');
					} else {
						navigate('/dashboard');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [fetchUser, navigate, setUserId]);

	const handleLogin = async () => {
		try {
			const response = await login({
				identifier: identifierRef.current.value,
				password: passwordRef.current.value,
			});

			const decodedToken = jwtDecode(response.token);
			const userId = decodedToken._id;

			localStorage.setItem('token', response.token);

			setUserId(userId);

			const user = await fetchUser(userId);
			if (user.profiles.length === 0) {
				navigate('/profile');
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
			<Card sx={{ minWidth: 275, width: '100%', maxWidth: 500 }}>
				<CardContent>
					<TextField
						type="text"
						placeholder="Username or Email"
						inputRef={identifierRef}
						sx={{ mb: 2, width: '100%' }}
					/>
					<TextField
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						inputRef={passwordRef}
						sx={{ mb: 2, width: '100%' }}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button variant="contained" onClick={handleLogin} sx={{ mb: 2, width: '100%' }}>
						Log In
					</Button>
					<Button component={Link} to="/signup" sx={{ mb: 2, width: '100%' }}>
						Go to Signup
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};

export default LoginComponent;