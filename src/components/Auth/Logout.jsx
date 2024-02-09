import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { logout } from '../../api/loginAPI';
import { UserContext } from '../../contexts/UserContext';

const LogoutButton = () => {
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await logout(() => {
                setUser(null);
                localStorage.removeItem('userId');
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleLogout}>Log Out</Button>
    );
};

export default LogoutButton;