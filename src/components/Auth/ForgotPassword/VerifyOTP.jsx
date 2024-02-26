import React, { useRef, useContext } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { verifyOTP } from '../../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../../contexts/SnackbarContext';

function VerifyOTP() {
    const otpRef = useRef();
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOTP(otpRef.current.value);
            console.log(response);
            navigate('/reset-password', { state: { otp: otpRef.current.value } });
        } catch (error) {
            setSnackbarMessage('Failed to verify OTP');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
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
            <Typography variant="h4" gutterBottom>Verify OTP</Typography>
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
                    id="otp"
                    label="OTP"
                    name="otp"
                    inputRef={otpRef}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Verify OTP
                </Button>
            </Box>
        </Container>
    );
}

export default VerifyOTP;