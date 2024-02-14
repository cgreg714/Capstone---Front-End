import React, { useRef, useContext } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

const AddProfileForm = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const pharmacyRef = useRef();

    const { createProfile } = useContext(ProfileContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const pharmacy = pharmacyRef.current.value;

        const profile = {
            firstName,
            lastName,
            email,
            pharmacy,
        };

        await createProfile(profile);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="First Name"
                        inputRef={firstNameRef}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Last Name"
                        inputRef={lastNameRef}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        inputRef={emailRef}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Pharmacy"
                        inputRef={pharmacyRef}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Profile
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProfileForm;