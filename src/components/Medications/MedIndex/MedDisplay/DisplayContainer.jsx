import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import DisplayNav from './DisplayNav';
import CardContainer from './MedCard/CardContainer';

function MedDisplay(props) {
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
			{' '}
			<Typography variant="h4" sx={styles.containerTitle}>
				Medications
			</Typography>
			{/* <DisplayNav /> */}
			<CardContainer />
		</Box>
	);
}

export default MedDisplay;
