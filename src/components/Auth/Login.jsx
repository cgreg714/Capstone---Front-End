import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { login } from '../../api/loginAPI';
import { UserContext } from '../../contexts/UserContext';

const LoginComponent = () => {
	const identifierRef = useRef();
	const passwordRef = useRef();
	const { setUserId, fetchUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await login({
				identifier: identifierRef.current.value,
				password: passwordRef.current.value,
			});
			console.log('🚀 ~ file: Login.jsx:22 ~ handleLogin ~ response:', response);
			setUserId(response.userId);

			const user = await fetchUser(response.userId);
			if (user.profiles.length === 0) {
				navigate('/profile');
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<TextField type="text" placeholder="Username or Email" inputRef={identifierRef} />
			<TextField type="password" placeholder="Password" inputRef={passwordRef} />
			<Button variant="contained" onClick={handleLogin}>
				Log In
			</Button>
			<Button component={Link} to="/signup">
				Go to Signup
			</Button>
		</div>
	);
};

export default LoginComponent;