import React, { useContext, useState, useMemo } from 'react';
import { Grid, Button } from '@mui/material';
import CardBody from './CardBody';
import { MedicationContext } from '../../../../../contexts/MedicationContext';
import { useTheme } from '@mui/material/styles';

function CardContainer() {
	const { medications } = useContext(MedicationContext);
	const [sortProperty, setSortProperty] = useState('dateAdded');
	const theme = useTheme();
	const [sortDirection, setSortDirection] = useState('asc');

	const handleSort = (property) => {
		if (property === sortProperty) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortProperty(property);
			setSortDirection('asc');
		}
	};

const sortedMedications = useMemo(() => {
	return [...medications].sort((a, b) => {
		if (sortProperty === 'dateAdded') {
			const aValue = new Date(a[sortProperty]).getTime();
			const bValue = new Date(b[sortProperty]).getTime();
			return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
		} else if (sortProperty === 'timeToTake') {
			const aValue = new Date(a.frequency[sortProperty]).getTime();
			const bValue = new Date(b.frequency[sortProperty]).getTime();
			return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
		} else {
			if (a[sortProperty] < b[sortProperty]) {
				return sortDirection === 'asc' ? -1 : 1;
			}
			if (a[sortProperty] > b[sortProperty]) {
				return sortDirection === 'asc' ? 1 : -1;
			}
			return 0;
		}
	});
}, [medications, sortProperty, sortDirection]); 

	return (
		<>
			<Button
				variant="contained"
				onClick={() => handleSort('dateAdded')}
				sx={{
					mr: 2,
					boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black',
				}}
			>
				Sort by Date Added {sortProperty === 'dateAdded' && (sortDirection === 'asc' ? '↓' : '↑')}
			</Button>
			<Button
				variant="contained"
				onClick={() => handleSort('timeToTake')}
				sx={{
					mr: 2,
					boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black',
				}}
			>
				Sort by Time to Take {sortProperty === 'timeToTake' && (sortDirection === 'asc' ? '↓' : '↑')}
			</Button>
			{/* <Button 
        variant='contained' 
        onClick={() => handleSort('prescriber')} 
        sx={{ 
          mr: 2, 
          boxShadow: theme.palette.mode === 'dark' ? '0 3px 10px white' : '0 3px 10px black' 
        }}
      >
        Sort by Prescriber
      </Button> */}
			<Grid container spacing={2}>
				{sortedMedications.map((medication, index) => {
					return (
						<Grid item xs={6} key={index}>
							<CardBody
								_id={medication._id}
								name={medication.name}
								description={medication.description}
								associatedDrug={medication.associatedDrug}
								dose={medication.dose}
								unitOfMeasurement={medication.unitOfMeasurement}
								doctor={`${medication.doctor.firstName} ${medication.doctor.lastName}`}
                pharmacy={medication.pharmacy ? medication.pharmacy.name : 'No pharmacy'}
								frequency={medication.frequency}
								quantity={medication.quantity}
								dateAdded={medication.dateAdded}
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

export default CardContainer;
