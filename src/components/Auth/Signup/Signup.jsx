import './Signup.css';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, Input, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import medication from '../../../assets/medicine130x130.png';
import { signup } from '../../../api/loginAPI';
import zxcvbn from 'zxcvbn';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signup() {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const emailRef = useRef();
	const navigate = useNavigate();

	const [passwordStrength, setPasswordStrength] = useState(0);
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await signup({
				email: emailRef.current.value,
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			});
			navigate('/login');
		} catch (error) {
			const errorMessage = error.response?.data?.error;
			if (errorMessage) {
				setErrorMessage(errorMessage);
			} else {
				console.error(error);
			}
		}
	};

	const handlePasswordChange = (event) => {
		const password = event.target.value;
		const result = zxcvbn(password);
		setPasswordStrength(result.score);
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

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<>
			<div className="medication">
				<img src={medication} alt="medication" />
			</div>
			<div className="header">
				<h2 className="header-title">DoseMinder</h2>
				<h4 className="header-subtitle">Sign Up</h4>
			</div>

			<Box component="form" onSubmit={handleLogin}>
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
								style={{ width: '400px', height: '50px', marginLeft: '40px', background: '#828A8F' }}
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
								style={{ width: '400px', height: '50px', marginLeft: '40px', background: '#828A8F' }}
								inputRef={usernameRef}
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
								style={{ width: '400px', height: '50px', marginLeft: '40px', background: '#828A8F' }}
								inputRef={passwordRef}
							/>
						</FormControl>
					</Box>
				</Box>
			</Box>

			<div className="submit-container">
				<div className="submit gray" onClick={handleLogin}>
					Go To Login
				</div>

				<div className="submit" onClick={handleSignup}>
					Sign Up
				</div>
			</div>
			<div className="copyright">
				<p>© Project Doseminder 2024</p>
			</div>
		</>
	);
}

export default Signup;
