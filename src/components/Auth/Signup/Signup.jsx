import './Signup.css';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, Input, Box, Grid, Typography, Container, Card } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { CiCircleRemove } from 'react-icons/ci';
import medication from '../../../assets/medicine130x130.png';
import { signup } from '../../../api/authAPI';
import zxcvbn from 'zxcvbn';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { Switch } from '@mui/material';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAnimation, motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function Signup() {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const navigate = useNavigate();

	const [passwordStrength, setPasswordStrength] = useState(0);
	const [showPassword, setShowPassword] = useState(false);
	// eslint-disable-next-line
	const [errorMessage, setErrorMessage] = useState(null);

	const [isLengthMet, setIsLengthMet] = useState(false);
	const [isUppercaseMet, setIsUppercaseMet] = useState(false);
	const [isNumberMet, setIsNumberMet] = useState(false);
	const [isSpecialCharMet, setIsSpecialCharMet] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const { theme, setTheme } = useContext(ThemeContext);
	const themes = useTheme();

	const [prevPasswordStrength, setPrevPasswordStrength] = useState(0);

	const handleSignup = async (e) => {
		e.preventDefault();
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			setOpenSnackbar(true);
			setSnackbarSeverity('error');
			setSnackbarMessage('Passwords do not match');
			return;
		}
		try {
			await signup({
				email: emailRef.current.value,
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			});

			setOpenSnackbar(true);
			setSnackbarSeverity('success');
			setSnackbarMessage('Signup successful!');

			navigate('/login');
		} catch (error) {
			const errorMessage = error.response?.data?.error || error.message;
			setOpenSnackbar(true);
			setSnackbarSeverity('error');
			setSnackbarMessage(errorMessage);
		}
	};

	const handlePasswordChange = (event) => {
		const password = event.target.value;
		setIsLengthMet(password.length >= 12);
		setIsUppercaseMet(/[A-Z]/.test(password));
		setIsNumberMet(/[0-9]/.test(password));
		setIsSpecialCharMet(/[@$!%*?&]/.test(password));
		const result = zxcvbn(password);
		setPrevPasswordStrength(passwordStrength);
		setPasswordStrength(result.score);
		setPasswordsMatch(password === confirmPasswordRef.current.value);
		if (passwordRef.current.value.length > 0 && passwordRef.current.value.length <= 4) {
			setPasswordStrength(1);
		}
	};

	const debouncedHandlePasswordChange = debounce(handlePasswordChange, 100);

	const handleConfirmPasswordChange = (event) => {
		setPasswordsMatch(passwordRef.current.value === event.target.value);
	};

	const getPasswordStrengthColor = () => {
		switch (passwordStrength) {
			case 0:
			case 1:
				return 'red';
			case 2:
				return 'yellow';
			case 3:
				return 'orange';
			case 4:
				return 'green';
			default:
				return 'red';
		}
	};

	const PasswordStrengthBar = () => {
		const color = getPasswordStrengthColor();
		const controls = useAnimation();

		useEffect(() => {
			controls.set({ width: `${prevPasswordStrength * 25}%` });
			controls.start({ width: `${passwordStrength * 25}%` });
		}, [controls]);

		return (
			<>
				<p>Password Strength</p>
				<div
					style={{
						height: '10px',
						width: '80%',
						backgroundColor: 'lightgrey',
						boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
						borderRadius: 4,
						marginLeft: '7%',
					}}
				>
					<motion.div
						style={{ height: '10px', backgroundColor: color, borderRadius: 4 }}
						animate={controls}
						transition={{ duration: 0.5 }}
					/>
				</div>
			</>
		);
	};
	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Container>
			<Card sx={{ margin: '50px', borderRadius: '10px', boxShadow: '-10px 10px 10px rgba(0, 0, 0, 0.15)' }}>
				<Box sx={{ margin: '50px', borderRadius: '10px' }}>
					<Box sx={{ textAlign: 'center' }}>
						<img
							src={medication}
							alt="medication"
							className="medication"
							style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '25px' }}
						/>
						<Box
							sx={{
								textAlign: 'center',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography variant="h4" mt={4}>
								DoseMinder
							</Typography>
							<Switch
								checked={theme === 'dark'}
								onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								icon={
									<Box
										component="span"
										sx={{
											verticalAlign: 'middle',
											transform: 'translateY(-6px)',
											marginLeft: '-6px',
										}}
									>
										<Brightness7Icon
											style={{ fontSize: 32, color: themes.palette.secondary.main }}
										/>
									</Box>
								}
								checkedIcon={
									<Box
										component="span"
										sx={{ verticalAlign: 'middle', transform: 'translateY(-6px)' }}
									>
										<Brightness4Icon style={{ fontSize: 32 }} />
									</Box>
								}
								sx={{ marginLeft: 2, marginTop: 5 }}
							/>
						</Box>
						<Typography variant="h6" mb={2}>
							Sign Up
						</Typography>
					</Box>

					<Box component="form" onSubmit={handleSignup}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Box className="inputs" sx={{ '& > :not(style)': { m: 1 } }}>
									<FormControl variant="standard">
										<InputLabel htmlFor="email" style={{ marginLeft: '40px' }}>
											Email
										</InputLabel>
										<Input
											id="email-with-icon"
											startAdornment={
												<InputAdornment position="start">
													<MailIcon />
												</InputAdornment>
											}
											style={{
												width: '400px',
												height: '50px',
												marginLeft: '40px',
											}}
											inputRef={emailRef}
										/>
									</FormControl>

									<FormControl variant="standard">
										<InputLabel htmlFor="username" style={{ marginLeft: '40px' }}>
											Username
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
											inputRef={usernameRef}
										/>
									</FormControl>
								</Box>
							</Grid>

							<Grid item xs={12} md={6}>
								<Box className="inputs" sx={{ '& > :not(style)': { m: 1 } }}>
									<FormControl variant="standard">
										<InputLabel htmlFor="password" style={{ marginLeft: '40px' }}>
											Password
										</InputLabel>
										<Input
											id="password"
											type={showPassword ? 'text' : 'password'}
											onChange={debouncedHandlePasswordChange}
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
														tabIndex={-1}
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

									<FormControl variant="standard">
										<InputLabel htmlFor="confirm-password" style={{ marginLeft: '40px' }}>
											Confirm Password
										</InputLabel>
										<Input
											id="confirm-password"
											type={showPassword ? 'text' : 'password'}
											onChange={handleConfirmPasswordChange}
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
														tabIndex={-1}
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
											inputRef={confirmPasswordRef}
										/>
									</FormControl>
								</Box>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<div style={{ width: '400px', margin: '0 auto' }}>
											<p>Password must contain:</p>
											<ul style={{ listStyleType: 'none' }}>
												<li>
													<span
														style={{
															display: 'inline-block',
															verticalAlign: 'middle',
															marginRight: '5px',
														}}
													>
														{isLengthMet ? (
															<RiCheckboxCircleLine
																color="green"
																style={{ position: 'relative', top: '2px' }}
															/>
														) : (
															<CiCircleRemove
																color="red"
																style={{ position: 'relative', top: '2px' }}
															/>
														)}
													</span>
													12 character minimum
												</li>
												<li>
													<span
														style={{
															display: 'inline-block',
															verticalAlign: 'middle',
															marginRight: '5px',
														}}
													>
														{isUppercaseMet ? (
															<RiCheckboxCircleLine
																color="green"
																style={{ position: 'relative', top: '2px' }}
															/>
														) : (
															<CiCircleRemove
																color="red"
																style={{ position: 'relative', top: '2px' }}
															/>
														)}
													</span>
													At least one uppercase letter
												</li>
												<li>
													<span
														style={{
															display: 'inline-block',
															verticalAlign: 'middle',
															marginRight: '5px',
														}}
													>
														{isNumberMet ? (
															<RiCheckboxCircleLine
																color="green"
																style={{ position: 'relative', top: '2px' }}
															/>
														) : (
															<CiCircleRemove
																color="red"
																style={{ position: 'relative', top: '2px' }}
															/>
														)}
													</span>
													At least one number
												</li>
												<li>
													<span
														style={{
															display: 'inline-block',
															verticalAlign: 'middle',
															marginRight: '5px',
														}}
													>
														{isSpecialCharMet ? (
															<RiCheckboxCircleLine
																color="green"
																style={{ position: 'relative', top: '2px' }}
															/>
														) : (
															<CiCircleRemove
																color="red"
																style={{ position: 'relative', top: '2px' }}
															/>
														)}
													</span>
													At least one special character
												</li>
											</ul>
										</div>
									</Box>
								</Grid>
								<Grid item xs={6}>
									<Box
										sx={{
											display: 'flex',
											flex: '1',
											flexDirection: 'column',
											alignItems: 'center',
											marginBottom: '20px',
										}}
									>
										<PasswordStrengthBar />
									</Box>
									<Box
										sx={{
											display: 'flex',
											flex: '1',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										{passwordsMatch ? (
											<p
												style={{
													textShadow:
														'0 0 10px #00ff00, 0 0 10px #00ff00, 0 0 30px #00ff00, 0 0 20px #00ff00',
												}}
											>
												Passwords match{' '}
												<RiCheckboxCircleLine
													color="green"
													style={{ position: 'relative', top: '2px' }}
												/>
											</p>
										) : (
											<p
												style={{
													textShadow:
														'0 0 10px #ff0000, 0 0 10px #ff0000, 0 0 30px #ff0000, 0 0 20px #ff0000',
												}}
											>
												Passwords do not match{' '}
												<CiCircleRemove
													color="red"
													style={{ position: 'relative', top: '2px' }}
												/>
											</p>
										)}
									</Box>
								</Grid>
							</Grid>
						</Grid>
						<Box sx={{ textAlign: 'center' }}>
							<div className="submit-container">
								<button className="submit gray hoverable" onClick={handleLogin}>
									Go To Login
								</button>

								<button className="submit hoverable" type="submit">
									Sign Up
								</button>
							</div>
						</Box>
					</Box>
				</Box>
				<footer>
					<div className="copyright">
						<p>© Project Doseminder 2024</p>
					</div>
				</footer>
			</Card>
		</Container>
	);
}

export default Signup;
