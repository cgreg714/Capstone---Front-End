import React, { useRef, useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { login } from '../../api/loginAPI';
import { UserContext } from '../../contexts/UserContext';

const LoginComponent = () => {
    const identifierRef = useRef();
    const passwordRef = useRef();
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            const response = await login({
                identifier: identifierRef.current.value,
                password: passwordRef.current.value,
            });
            setUser(response.user);
            localStorage.setItem('username', response.user.username); // save username in local storage
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TextField
                type="text"
                placeholder="Username or Email"
                inputRef={identifierRef}
            />
            <TextField
                type="password"
                placeholder="Password"
                inputRef={passwordRef}
            />
            <Button variant="contained" onClick={handleLogin}>Log In</Button>
        </div>
    );
};

export default LoginComponent;