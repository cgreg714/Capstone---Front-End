import React, { useContext, useState } from 'react';
import { Accordion, AccordionSummary, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ProfileContext } from '../../../contexts/ProfileContext';
import AddProfileForm from '../AddProfileForm';
import AddDoctorForm from '../AddDoctorForm';
import AddABuddyForm from '../AddABuddyForm';
// import { ProfileProvider } from '../../../contexts/ProfileContext';

const ProfileCards = () => {
	const { doctors, abuddies, profiles, profileId, doctorId, aBuddyId, updateProfile, updateDoctor, updateABuddy } = useContext(ProfileContext);

	const currentProfile = profiles.find((profile) => profile._id === profileId);
	const currentDoctor = doctors.find((doctor) => doctor._id === doctorId)
	const currentBuddy = abuddies.find((abuddies) => abuddies._id === aBuddyId)

    const [editedProfile, setEditedProfile] = useState(currentProfile || {});
	const [editedDoctor, setEditedDoctor] = useState(currentDoctor || {});
	const [editedABuddy, setEditedABuddy] = useState(currentBuddy || {});

    const [isProfileEditMode, setIsProfileEditMode] = useState(false);
	const [isDoctorEditMode, setIsDoctorEditMode] = useState(false);
	const [isABuddyEditMode, setIsABuddyEditMode] = useState(false)

	const handleProfileSave = () => {
        if (editedProfile) {
            updateProfile(profileId, editedProfile);
            setIsProfileEditMode(false);
        }
    };
	const handleDoctorSave = (doctorId, editedDoctor) => {
		if(editedDoctor) {
			updateDoctor(doctorId, editedDoctor);
			setIsDoctorEditMode(false);
		}
    };
	const handleABuddySave = (aBuddyId, editedABuddy) => {
		if (editedABuddy) {
			updateABuddy(aBuddyId, editedABuddy);
			setIsABuddyEditMode(false)
		}
    };

	const handleProfileCancel = () => {
		setIsProfileEditMode(false);
		setEditedProfile(currentProfile || {});
	};
	const handleDoctorCancel = () => {
		setIsDoctorEditMode(false)
		setEditedDoctor(currentDoctor || {})
	}
	const handleABuddyCancel = () => {
		setIsABuddyEditMode(false)
		setEditedABuddy(currentBuddy || {})
	}

	return (
		<div>
			<Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
				Profile
			</Typography>
			<Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 1 }}>
                <CardContent>
                    {currentProfile && (
                        <div>
                            {!isProfileEditMode ? (
                                <div>
                                    <Typography variant="h5" component="div">
                                        {currentProfile.firstName} {currentProfile.lastName}
                                    </Typography>
                                    <Typography variant="body2">Email: {currentProfile.email}</Typography>
                                    <Button onClick={() => setIsProfileEditMode(true)}>Edit</Button>
                                </div>
                            ) : (
                                <div>
                                    <TextField
                                        label="First Name"
                                        value={editedProfile.firstName}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                                    />
                                    <TextField
                                        label="Last Name"
                                        value={editedProfile.lastName}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                                    />
                                    <TextField
                                        label="Email"
                                        value={editedProfile.email}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                    />
                                    <Button onClick={handleProfileSave}>Save</Button>
                                    <Button onClick={handleProfileCancel}>Cancel</Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

			<Accordion disableGutters sx={{ maxWidth: 600, mt: 2, mb: 1 }}>
				<AccordionSummary
				expandIcon={<ArrowDropDownIcon />}
				>
					<Typography>Add Profile</Typography>
				</AccordionSummary>
					<AddProfileForm maxWidth="auto" />
			</Accordion>

			{/* //! grid size can modify the accordion width initially */}

			<Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
				Doctors
			</Typography>
			{doctors.map((doctor) => (
                <Card key={doctor._id} sx={{ maxWidth: 250, marginTop: 2, marginBottom: 1 }}>
                    <CardContent>
                        {!isDoctorEditMode ? (
                            <div>
                                <Typography variant="h5" component="div">
                                    {doctor.firstName} {doctor.lastName}
                                </Typography>
                                <Typography variant="body2">Phone Number: {doctor.phoneNumber}</Typography>
                                <Button onClick={() => setIsDoctorEditMode(true)}>Edit</Button>
                            </div>
                        ) : (
                            <div>
                                <TextField
                                    label="First Name"
                                    value={editedDoctor.firstName}
                                    onChange={(e) => setEditedDoctor({ ...editedDoctor, firstName: e.target.value })}
                                />
                                <TextField
                                    label="Last Name"
                                    value={editedDoctor.lastName}
                                    onChange={(e) => setEditedDoctor({ ...editedDoctor, lastName: e.target.value })}
                                />
                                <TextField
                                    label="Phone Number"
                                    value={editedDoctor.phoneNumber}
                                    onChange={(e) => setEditedDoctor({ ...editedDoctor, phoneNumber: e.target.value })}
                                />
                                <Button onClick={handleDoctorSave}>Save</Button>
                                <Button onClick={handleDoctorCancel}>Cancel</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

			<Accordion disableGutters sx={{maxWidth: 600}}>
				<AccordionSummary
				expandIcon={<ArrowDropDownIcon />}
				>
					<Typography>Add Doctor</Typography>
				</AccordionSummary>
					<AddDoctorForm />
			</Accordion>

			<Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
				ABuddies
			</Typography>
			{abuddies.map((abuddy) => (
                <Card key={abuddy._id} sx={{ maxWidth: 250, marginTop: 2, marginBottom: 1 }}>
                    <CardContent>
                        {!isABuddyEditMode ? (
                            <div>
                                <Typography variant="h5" component="div">
                                    {abuddy.firstName} {abuddy.lastName}
                                </Typography>
                                <Typography variant="body2">Relation: {abuddy.relation}</Typography>
                                <Typography variant="body2">Email: {abuddy.email}</Typography>
                                <Typography variant="body2">Phone Number: {abuddy.phoneNumber}</Typography>
                                <Button onClick={() => setIsABuddyEditMode(true)}>Edit</Button>
                            </div>
                        ) : (
                            <div>
                                <TextField
                                    label="First Name"
                                    value={editedABuddy.firstName}
                                    onChange={(e) => setEditedABuddy({ ...editedABuddy, firstName: e.target.value })}
                                />
                                <TextField
                                    label="Last Name"
                                    value={editedABuddy.lastName}
                                    onChange={(e) => setEditedABuddy({ ...editedABuddy, lastName: e.target.value })}
                                />
                                <TextField
                                    label="Relation"
                                    value={editedABuddy.relation}
                                    onChange={(e) => setEditedABuddy({ ...editedABuddy, relation: e.target.value })}
                                />
                                <TextField
                                    label="Email"
                                    value={editedABuddy.email}
                                    onChange={(e) => setEditedABuddy({ ...editedABuddy, email: e.target.value })}
                                />
                                <TextField
                                    label="Phone Number"
                                    value={editedABuddy.phoneNumber}
                                    onChange={(e) => setEditedABuddy({ ...editedABuddy, phoneNumber: e.target.value })}
                                />
                                <Button onClick={handleABuddySave}>Save</Button>
                                <Button onClick={handleABuddyCancel}>Cancel</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

			<Accordion disableGutters sx={{maxWidth: 600}}>
				<AccordionSummary
				expandIcon={<ArrowDropDownIcon />}
				aria-controls="panel2-content"
				id="panel2-header"
				>
					<Typography>Add Buddy</Typography>
				</AccordionSummary>
					<AddABuddyForm />
			</Accordion>
		</div>
	);
};

export default ProfileCards;
