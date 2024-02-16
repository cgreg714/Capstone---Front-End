import React, { useRef, useContext } from 'react';
import { Button, TextField, Box, Card, CardContent } from '@mui/material';
import { ProfileContext } from '../../contexts/ProfileContext';

function AddABuddyForm() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const relationRef = useRef();
	const emailRef = useRef();
	const phoneNumberRef = useRef();

	const { createABuddy } = useContext(ProfileContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const aBuddy = {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			relation: relationRef.current.value,
			email: emailRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		};

		await createABuddy(aBuddy);
	};

	return (
		<Card style={{ maxWidth: '600px' }}>
			<CardContent>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField inputRef={firstNameRef} label="First Name" required />
					<TextField inputRef={lastNameRef} label="Last Name" required />
					<TextField inputRef={relationRef} label="Relation" required />
					<TextField inputRef={emailRef} label="Email" required />
					<TextField inputRef={phoneNumberRef} label="Phone Number" required />
					<Button type="submit">Add ABuddy</Button>
				</Box>
			</CardContent>
		</Card>
	);
}

export default AddABuddyForm;
