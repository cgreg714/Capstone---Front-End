import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Card, CardContent, LinearProgress, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { signup } from '../../api/loginAPI';
import zxcvbn from 'zxcvbn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();
    
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSignup = async () => {
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Card sx={{ minWidth: 275, width: '100%', maxWidth: 500 }}>
                <CardContent>
                {errorMessage && <p>{errorMessage}</p>}
                    <TextField
                        type="email"
                        placeholder="Email"
                        inputRef={emailRef}
                        sx={{ mb: 2, width: '100%' }}
                    />
                    <TextField
                        type="text"
                        placeholder="Username"
                        inputRef={usernameRef}
                        sx={{ mb: 2, width: '100%' }}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        inputRef={passwordRef}
                        onChange={handlePasswordChange}
                        sx={{ mb: 2, width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <LinearProgress
                        variant="determinate"
                        value={passwordStrength * 25}
                        sx={{ 
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: getPasswordStrengthColor(),
                            },
                            mb: 2, 
                            width: '100%' 
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSignup}
                        sx={{ mb: 2, width: '100%' }}
                    >
                        Sign Up
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        sx={{ mb: 2, width: '100%' }}
                    >
                        Go to Login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;