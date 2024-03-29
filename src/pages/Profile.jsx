import React, { useState } from 'react';
import { Grid, Card, Tabs, Tab, Box } from '@mui/material';
import ProfileCard from '../components/Profile/Card/ProfileCard';
import ABuddyCard from '../components/Profile/Card/AbuddyCard';
import DoctorCard from '../components/Profile/Card/DoctorCard';
import PharmacyCard from '../components/Profile/Card/PharmacyCard.jsx';
import AddProfileForm from '../components/Profile/AddProfileForm.jsx';
import AddDoctorForm from '../components/Profile/AddDoctorForm.jsx';
import AddABuddyForm from '../components/Profile/AddABuddyForm.jsx';
import AddPharmacyForm from '../components/Profile/AddPharmacyForm.jsx';
import { useTheme } from '@mui/material/styles';

function PharmacyCardWrapper() {
	return (
		<Grid container>
			<Grid item xs={5}>
				<AddPharmacyForm />
			</Grid>
			<Grid item xs={7}>
				<PharmacyCard />
			</Grid>
		</Grid>
	);
}

function AbuddyCardWrapper() {
	return (
		<Grid container>
			<Grid item xs={5}>
				<AddABuddyForm />
			</Grid>
			<Grid item xs={7}>
				<ABuddyCard />
			</Grid>
		</Grid>
	);
}

function DoctorCardWrapper() {
	return (
		<Grid container>
			<Grid item xs={5}>
				<AddDoctorForm />
			</Grid>
			<Grid item xs={7}>
				<DoctorCard />
			</Grid>
		</Grid>
	);
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function Profile() {
	const [value, setValue] = useState(0);
	const theme = useTheme();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container rowSpacing={3}>
			<Grid item xs={12}>
				<Card sx={{ border: '2px solid grey', borderRadius: 4 }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
							sx={{
								backgroundColor: theme.palette.third.main,
								fontFamily: theme.typography.fontFamily,
								borderBottom: '2px solid black',
							}}
						>
							<Tab label="Profile" style={{ color: '#000', fontWeight: 'bold' }} />
							<Tab label="Doctors" style={{ color: '#000', fontWeight: 'bold' }} />
							<Tab label="Pharmacies" style={{ color: '#000', fontWeight: 'bold' }} />
							<Tab label="Emergency Contacts" style={{ color: '#000', fontWeight: 'bold' }} />
							<Tab label="Add Profile" style={{ color: '#000', fontWeight: 'bold' }} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<ProfileCard />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<DoctorCardWrapper />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<PharmacyCardWrapper />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<AbuddyCardWrapper />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<AddProfileForm />
					</TabPanel>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Profile;
