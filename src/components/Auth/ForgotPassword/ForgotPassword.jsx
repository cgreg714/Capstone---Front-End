import React, { useState, useRef } from 'react';
import { sendPasswordResetEmail } from '../../../api/authAPI';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

function ForgotPassword() {
    const emailRef = useRef();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendPasswordResetEmail(emailRef.current.value);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.message);
        }
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
            <Typography variant="h4" gutterBottom>Forgot Your Password?</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 300,
                    mt: 1,
                }}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    inputRef={emailRef}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send Reset Link
                </Button>
            </Box>
            {message && <Typography variant="body1">{message}</Typography>}
        </Container>
    );
}

export default ForgotPassword;