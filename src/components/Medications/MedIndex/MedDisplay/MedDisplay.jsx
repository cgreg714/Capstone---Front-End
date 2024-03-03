import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CardContainer from './MedCard/CardContainer';

function MedDisplay() {
	const theme = useTheme();

	let styles = {
		medContainer: {
			backgroundColor: theme.palette.secondary.main,
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