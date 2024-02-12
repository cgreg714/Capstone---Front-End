import React, { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { login } from '../../api/loginAPI';
import { UserContext } from '../../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';

const LoginComponent = () => {
	const identifierRef = useRef();
	const passwordRef = useRef();
	const { setUserId, fetchUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		const userId = localStorage.getItem('userId');
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
	}, []);

	const handleLogin = async () => {
		try {
			const response = await login({
				identifier: identifierRef.current.value,
				password: passwordRef.current.value,
			});
			console.log('🚀 ~ file: Login.jsx:22 ~ handleLogin ~ response:', response);

			const decodedToken = jwtDecode(response.token);
			const userId = decodedToken._id;

			localStorage.setItem('userId', userId);
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
