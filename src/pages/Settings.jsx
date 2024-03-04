import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Settings() {

    const {userId, user} = useContext(UserContext)

    console.log(user)

	const [active, setActive] = useState('GeneralCard')

	return (
		<>
            <Box>
                <Button component={Link} to="/profile">Profile Settings</Button>
            </Box>
            <Box>
                {active === 'GeneralCard' && <SettingCard /> }
            </Box>
        </>
	);
}

export function SettingCard() {
    return (
        <div>
            <h2>Email</h2>
            <p>Email here</p>

            <h2>Username</h2>
            <p>Username here</p>

            <h3>Change Password</h3>
        </div>
    )
}