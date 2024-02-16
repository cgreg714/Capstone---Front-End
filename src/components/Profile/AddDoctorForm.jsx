import React, { useRef, useContext } from 'react';
import { Button, TextField, Box, Card, CardContent } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

function AddDoctorForm() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const streetRef = useRef();
	const cityOrTownRef = useRef();
	const stateRef = useRef();
	const zipRef = useRef();
	const phoneNumberRef = useRef();

	const { createDoctor } = useContext(ProfileContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const doctor = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			street: streetRef.current.value,
			cityOrTown: cityOrTownRef.current.value,
			state: stateRef.current.value,
			zip: zipRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		await createDoctor(doctor);
	};

	return (
		<Card style={{ maxWidth: '600px' }}>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField inputRef={firstNameRef} label="First Name" required />
					<TextField inputRef={lastNameRef} label="Last Name" required />
					<TextField inputRef={streetRef} label="Street" />
					<TextField inputRef={cityOrTownRef} label="City or Town" />
					<TextField inputRef={stateRef} label="State" />
					<TextField inputRef={zipRef} label="Zip" />
					<TextField inputRef={phoneNumberRef} label="Phone Number" />
					<Button type="submit">Add Doctor</Button>
				</Box>
			</CardContent>
		</Card>
	);
}

export default AddDoctorForm;
