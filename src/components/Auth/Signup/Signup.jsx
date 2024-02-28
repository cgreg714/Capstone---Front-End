import './Signup.css';
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, Input, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { CiCircleRemove } from 'react-icons/ci';
import medication from '../../../assets/medicine130x130.png';
import { signup } from '../../../api/authAPI';
import zxcvbn from 'zxcvbn';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SnackbarContext } from '../../../contexts/SnackbarContext';

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
		setPasswordStrength(result.score);
		setPasswordsMatch(password === confirmPasswordRef.current.value);
	};

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
		return (
			<>
				<p>Password Strength</p>
				<div style={{ height: '10px', width: '80%', backgroundColor: 'grey', marginLeft: '7%' }}>
					<div style={{ height: '10px', width: `${passwordStrength * 25}%`, backgroundColor: color }} />
				</div>
			</>
		);
	};

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<>
			<div className="medication">
				<img src={medication} alt="Medication" />
			</div>
			<header className="header">
				<h2 className="header-title">DoseMinder</h2>
				<h4 className="header-subtitle">Sign Up</h4>
			</header>

			<main>
				<Box component="form" onSubmit={handleSignup}>
					<Box className="inputs">
						<Box sx={{ '& > :not(style)': { m: 1 } }}>
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
										background: '#828A8F',
									}}
									inputRef={emailRef}
								/>
							</FormControl>
						</Box>

						<Box sx={{ '& > :not(style)': { m: 1 } }}>
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
										background: '#828A8F',
									}}
									inputRef={usernameRef}
								/>
							</FormControl>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								'& > :not(style)': { m: 1 },
							}}
						>
							<PasswordStrengthBar />
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
						{passwordsMatch ? (
							<p>
								Passwords match{' '}
								<RiCheckboxCircleLine color="green" style={{ position: 'relative', top: '2px' }} />
							</p>
						) : (
							<p>
								Passwords do not match{' '}
								<CiCircleRemove color="red" style={{ position: 'relative', top: '2px' }} />
							</p>
						)}
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								'& > :not(style)': { m: 1 },
							}}
						>
							<FormControl variant="standard">
								<InputLabel htmlFor="password" style={{ marginLeft: '40px' }}>
									Password
								</InputLabel>
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									onChange={handlePasswordChange}
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
										background: '#828A8F',
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
										background: '#828A8F',
									}}
									inputRef={confirmPasswordRef}
								/>
							</FormControl>
						</Box>
					</Box>
				</Box>
			</main>

			<footer>
				<div className="submit-container">
					<button className="submit gray hoverable" onClick={handleLogin}>
						Go To Login
					</button>

					<button className="submit hoverable" onClick={handleSignup}>
						Sign Up
					</button>
				</div>
				<div className="copyright">
					<p>© Project Doseminder 2024</p>
				</div>
			</footer>
		</>
	);
}

export default Signup;
