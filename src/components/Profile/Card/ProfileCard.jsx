import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ProfileContext } from '../../../contexts/ProfileContext';

const ProfileCards = () => {
	const { doctors, abuddies, profiles, profileId } = useContext(ProfileContext);

	const currentProfile = profiles.find((profile) => profile._id === profileId);

	return (
		<div>
			<Typography variant="h4" component="div">
				Profile
			</Typography>

			{currentProfile && (
				<Card key={currentProfile._id} sx={{ maxWidth: 250, marginTop: 2 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{currentProfile.firstName} {currentProfile.lastName}
						</Typography>
						<Typography variant="body2">Email: {currentProfile.email}</Typography>
						<Typography variant="body2">Phone Number: {currentProfile.phoneNumber}</Typography>
					</CardContent>
				</Card>
			)}

			<Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
				Doctors
			</Typography>
			{doctors.map((doctor) => (
				<Card key={doctor._id} sx={{ maxWidth: 250, marginTop: 2 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{doctor.firstName} {doctor.lastName}
						</Typography>
						<Typography variant="body2">Phone Number: {doctor.phoneNumber}</Typography>
					</CardContent>
				</Card>
			))}

			<Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
				ABuddies
			</Typography>
			{abuddies.map((abuddy) => (
				<Card key={abuddy._id} sx={{ maxWidth: 250, marginTop: 2 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{abuddy.firstName} {abuddy.lastName}
						</Typography>
						<Typography variant="body2">Relation: {abuddy.relation}</Typography>
						<Typography variant="body2">Email: {abuddy.email}</Typography>
						<Typography variant="body2">Phone Number: {abuddy.phoneNumber}</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default ProfileCards;
