import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../../api/authAPI';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { StyledLogoutButton } from '../../styles/mainLayoutStyles';

const LogoutButton = () => {
	const { setUser } = useContext(UserContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout(() => {
				setUser(null);
				localStorage.removeItem('token');
				localStorage.removeItem('profileId');
				navigate('/login');
			});
		} catch (error) {
			setSnackbarMessage('An error occurred while logging out');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	return (
		<StyledLogoutButton variant="contained" color="primary" onClick={handleLogout}>
			Log Out
		</StyledLogoutButton>
	);
};

export default LogoutButton;
