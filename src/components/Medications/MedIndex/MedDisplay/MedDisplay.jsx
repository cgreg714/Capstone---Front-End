import React from 'react';
import { Typography, Box } from '@mui/material';
import CardContainer from './MedCard/CardContainer';

function MedDisplay() {
	let styles = {
		medContainer: {
			backgroundColor: '#E89665',
			padding: '10px',
			margin: '0 auto',
		},
		containerTitle: {
			color: '#000',
		},
	};

	return (
		<Box sx={{ ...styles.medContainer, minHeight: '500px' }}>
			<Typography variant="h4" sx={styles.containerTitle}>
				Medications
			</Typography>
			<CardContainer />
		</Box>
	);
}

export default MedDisplay;
