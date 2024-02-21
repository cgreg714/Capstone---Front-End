import React, { useRef, useContext, useState } from 'react';
import { Avatar, TextField, Button, Grid, Box, Card, CardContent } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

const avatarContext = require.context('../../assets/Avatars', false, /\.png$/);

const avatarImages = avatarContext.keys().map(avatarContext);

const AddProfileForm = () => {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();

	const { createProfile } = useContext(ProfileContext);

	const [selectedAvatar, setSelectedAvatar] = useState(null);

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

		await createProfile(profile);

		firstNameRef.current.value = '';
		lastNameRef.current.value = '';
		emailRef.current.value = '';
	};

	return (
		<Card sx={{ maxWidth: 600 }}>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField label="First Name" inputRef={firstNameRef} fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField label="Last Name" inputRef={lastNameRef} fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField label="Email" inputRef={emailRef} fullWidth />
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
						<Grid item xs={12}>
							<Button type="submit" variant="contained" color="primary" fullWidth>
								Add Profile
							</Button>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddProfileForm;