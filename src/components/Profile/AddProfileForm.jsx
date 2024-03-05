import React, { useRef, useContext, useState } from 'react';
import { Avatar, TextField, Grid, Box, CardContent, Card, CardHeader } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { useTheme } from '@mui/material/styles';
import { Styled3DButton } from '../../styles/mainLayoutStyles';

const avatarContext = require.context('../../assets/Avatars', false, /\.png$/);

const avatarImages = avatarContext.keys().map(avatarContext);

const AddProfileForm = ({ onProfileCreated }) => {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();

	const { createProfile } = useContext(ProfileContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext); // Use SnackbarContext

	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const theme = useTheme();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = emailRef.current.value;

		const profile = {
			firstName,
			lastName,
			email,
			avatar: selectedAvatar,
		};

		try {
			await createProfile(profile);

			if (onProfileCreated) {
				onProfileCreated(profile);
			}

			setSnackbarMessage('Profile created successfully');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
		} catch (error) {
			setSnackbarMessage('An error occurred while creating the profile');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}

		firstNameRef.current.value = '';
		lastNameRef.current.value = '';
		emailRef.current.value = '';
	};

	return (
		<Card
			sx={{
				maxWidth: 1000,
				backgroundColor: theme.palette.secondary.main,
				boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.8)',
				borderRadius: 4,
			}}
		>
			<CardHeader title="Add Profile" titleTypographyProps={{ align: 'center' }} />{' '}
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								label="First Name"
								inputRef={firstNameRef}
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Last Name"
								inputRef={lastNameRef}
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Email"
								inputRef={emailRef}
								fullWidth
								sx={{
									'& .MuiInputBase-input': {
										backgroundColor: '#f9c47f',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Avatar src={selectedAvatar} sx={{ width: 100, height: 100, mb: 5 }} />
							</Box>
							<Box
								sx={{
									overflow: 'auto',
									maxHeight: '225px',
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
									gap: 2,
									padding: 1,
								}}
							>
								{avatarImages.map((image, index) => (
									<Avatar
										key={index}
										src={image}
										sx={{
											width: 60,
											height: 60,
											cursor: 'pointer',
											transition: 'transform .2s',
											'&:hover': {
												transform: 'scale(1.2)',
												overflow: 'visible',
											},
											transform: image === selectedAvatar ? 'scale(1.2)' : 'none',
											border: image === selectedAvatar ? '2px solid #3f51b5' : 'none',
										}}
										onClick={() => setSelectedAvatar(image)}
									/>
								))}
							</Box>
						</Grid>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Styled3DButton type="submit" variant="contained" color="secondary">
								Add Profile
							</Styled3DButton>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddProfileForm;
