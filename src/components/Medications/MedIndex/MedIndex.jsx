import React, { useState } from 'react';
import MedDisplay from './MedDisplay/MedDisplay';
import EditMedications from './MedEdit';
import { Tabs, Tab, Card } from '@mui/material';
import AddMedicationForm from '../AddMedicationForm';
import { useTheme } from '@mui/material/styles';

function MedIndex() {
	const [page, setPage] = useState('ADD');
	const theme = useTheme();

	const handleClose = () => {
		setPage('DISPLAY');
	};

	const handleChange = (event, newValue) => {
		setPage(newValue);
	};

	return (
		<Card
			sx={{
				border: '2px solid grey',
				maxWidth: 1000,
				borderRadius: 4,
				boxShadow: (theme) =>
					`0 5px 5px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}`,
			}}
		>
			<Tabs
				value={page}
				onChange={handleChange}
				sx={{
					backgroundColor: theme.palette.third.main,
					fontFamily: theme.typography.fontFamily,
					borderBottom: '2px solid black',
				}}
			>
				<Tab value="ADD" label="Add Medication" style={{ color: '#000' }} />
				{/* <Tab value="DISPLAY" label="Medications" style={{ color: '#000' }} /> */}
				<Tab value="EDIT" label="Edit Medications" style={{ color: '#000' }} />
			</Tabs>
			{page === 'ADD' && <AddMedicationForm />}
			{/* {page === 'DISPLAY' && <MedDisplay />} */}
			{page === 'EDIT' && <EditMedications />}
		</Card>
	);
}

export default MedIndex;
