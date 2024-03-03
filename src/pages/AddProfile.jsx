import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddProfileForm from '../components/Profile/AddProfileForm';

function AddProfilePage() {
    const navigate = useNavigate();

	const handleProfileCreated = () => {
        navigate('/dashboard');
    };

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={12}>
				<Box display="flex" justifyContent="center">
					<AddProfileForm onProfileCreated={handleProfileCreated} />
				</Box>
			</Grid>
		</Grid>
	);
}

export default AddProfilePage;