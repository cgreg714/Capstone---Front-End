import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddProfileFormTwo from '../components/Profile/AddProfileFormTwo';

function AddProfilePage() {
    const navigate = useNavigate();

	const handleProfileCreated = () => {
        navigate('/dashboard');
    };

	return (
		<Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={12}>
				<Box display="flex" justifyContent="center">
					<AddProfileFormTwo onProfileCreated={handleProfileCreated} />
				</Box>
			</Grid>
		</Grid>
	);
}

export default AddProfilePage;