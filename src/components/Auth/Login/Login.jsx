import './Login.css';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, Input, Box, Card, CardContent, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import medication from '../../../assets/medicine130x130.png';
import { UserContext } from '../../../contexts/UserContext';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { jwtDecode } from 'jwt-decode';
import { login } from '../../../api/authAPI';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingBar from '../../LoadingScreen';
import { motion } from 'framer-motion';

function Login() {
	const identifierRef = useRef(null);
	const passwordRef = useRef(null);

	const navigate = useNavigate();

	// eslint-disable-next-line
	const [action, setAction] = useState('Login');
	const { setUserId, fetchUser } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

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
			setSnackbarMessage('Failed to decode token');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}

		if (userId) {
			setUserId(userId);
			try {
				fetchUser(userId);
				navigate('/dashboard');
			} catch (error) {
				setSnackbarMessage('Failed to fetch user');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	}, [fetchUser, navigate, setUserId, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]);

	const handleLogin = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const response = await login({
				identifier: identifierRef.current.value,
				password: passwordRef.current.value,
			});

			setOpenSnackbar(true);
			setSnackbarSeverity('success');
			setSnackbarMessage('Login successful!');

			const decodedToken = jwtDecode(response.token);
			const userId = decodedToken._id;

			localStorage.setItem('token', response.token);

			setUserId(userId);

			const user = await fetchUser(userId);
			if (user.profiles && user.profiles.length > 0) {
				navigate('/profile-selection');
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			setSnackbarMessage(error.message);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = () => {
		navigate('/signup');
	};

	if (loading) {
		return <LoadingBar />;
	}

	return (
		<div className="container">
			<Card sx={{ margin: '50px', borderRadius: '10px', boxShadow: '-10px 10px 10px rgba(0, 0, 0, 0.15)' }}>				<CardContent>
					<div className="medication">
						<img src={medication} alt="medication" />
					</div>
					<Typography variant="h4" mt={4}>
						DoseMinder
					</Typography>
					<Typography variant="h6" mb={2}>
						Login
					</Typography>
					<Box component="form" onSubmit={handleLogin}>
						<Box className="inputs">
							<Box sx={{ '& > :not(style)': { m: 1 } }}>
								<FormControl variant="standard">
									<InputLabel htmlFor="username" style={{ marginLeft: '40px' }}>
										Username/Email
									</InputLabel>
									<Input
										id="username-with-icon"
										startAdornment={
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										}
										style={{
											width: '400px',
											height: '50px',
											marginLeft: '40px',
										}}
										inputRef={identifierRef}
									/>
								</FormControl>
							</Box>

							<Box sx={{ '& > :not(style)': { m: 1 } }}>
								<FormControl variant="standard">
									<InputLabel htmlFor="password" style={{ marginLeft: '40px' }}>
										Password
									</InputLabel>
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										startAdornment={
											<InputAdornment position="start">
												<LockIcon />
											</InputAdornment>
										}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										style={{
											width: '400px',
											height: '50px',
											marginLeft: '40px',
										}}
										inputRef={passwordRef}
									/>
								</FormControl>
							</Box>
						</Box>
						Forgotten Password:
						<motion.div
							whileHover={{
								scale: 1.1,
								color: 'rgb(255, 215, 0)',
								transition: { duration: 0.5, yoyo: Infinity },
							}}
							style={{ color: 'rgb(255, 192, 203)', textDecoration: 'inherit', cursor: 'pointer' }}
							onClick={() => navigate('/forgot-password')}
						>
							Click Here!
						</motion.div>
						<div className="submit-container">
							<button className="submit" type="submit">
								Login
							</button>

							<div className={action === 'Login' ? 'submit' : 'submit'} onClick={handleSignUp}>
								Go To Sign Up
							</div>
						</div>
					</Box>
				</CardContent>
				<footer className="copyright">
					<p>© Project Doseminder 2024</p>
				</footer>
			</Card>
		</div>
	);
}

export default Login;
