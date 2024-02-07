import React from 'react';
import { Button } from '@mui/material';
import { logout } from '../../api/loginAPI';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant="contained" onClick={handleLogout}>Log Out</Button>
    );
};

export default LogoutButton;