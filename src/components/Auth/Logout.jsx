import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../../api/authAPI';
import { UserContext } from '../../contexts/UserContext';

const LogoutButton = () => {
    const { setUser } = useContext(UserContext);
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
            console.error(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleLogout} sx={{ minWidth: 120 }}>Log Out</Button>
    );
};

export default LogoutButton;