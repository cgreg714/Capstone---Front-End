import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage, snackbarSeverity, setSnackbarSeverity }}>
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

            >
                <Alert 
                    onClose={handleClose} 
                    severity={snackbarSeverity} 
                    variant="filled"
                    sx={{ 
                        bgcolor: snackbarSeverity === 'success' ? 'rgb(144, 238, 144)' : 'rgb(255, 204, 204)', 
                        borderColor: snackbarSeverity === 'success' ? '#00ff00' : '#ff0000',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        color: 'black'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};