import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import { signup } from '../../api/loginAPI';

const Signup = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const handleSignup = async () => {
        try {
            const response = await signup({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value,
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TextField
                type="text"
                placeholder="Username"
                inputRef={usernameRef}
            />
            <TextField
                type="password"
                placeholder="Password"
                inputRef={passwordRef}
            />
            <TextField
                type="email"
                placeholder="Email"
                inputRef={emailRef}
            />
            <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        </div>
    );
};

export default Signup;