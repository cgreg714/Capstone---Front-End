import React, { useState, useRef } from 'react';
import { Box, Container, TextField, Button, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import zxcvbn from 'zxcvbn';
import { resetPassword } from '../../../api/authAPI';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { token } = useParams();

    const handlePasswordChange = (e) => {
        setPasswordStrength(zxcvbn(passwordRef.current.value).score);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await resetPassword(token, passwordRef.current.value);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>Reset Password</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    mt: 1,
                }}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    inputRef={passwordRef}
                    onChange={handlePasswordChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        ),
                    }}
                />
                <Typography variant="body1">Password Strength: {passwordStrength}/4</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    inputRef={confirmPasswordRef}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Reset Password
                </Button>
            </Box>
        </Container>
    );
}

export default ResetPassword;