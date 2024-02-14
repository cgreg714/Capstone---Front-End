import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function MedicationSchedule({
	schedule = [
        {
            date: '2022-01-03',
            meds: [
                { name: 'Medication 7', time: '08:00' },
                { name: 'Medication 8', time: '12:00' },
                { name: 'Medication 9', time: '16:00' },
                { name: 'Medication 10', time: '20:00' },
            ],
        },
        {
            date: '2022-01-02',
            meds: [
                { name: 'Medication 5', time: '08:00' },
                { name: 'Medication 6', time: '12:00' },
            ],
        },
		{
			date: '2022-01-01',
			meds: [
				{ name: 'Medication 1', time: '08:00' },
				{ name: 'Medication 2', time: '12:00' },
				{ name: 'Medication 3', time: '16:00' },
				{ name: 'Medication 4', time: '20:00' },
			],
		},
	],
}) {
    const mostRecentDay = schedule[schedule.length - 1];
    const mostRecentMedication = mostRecentDay.meds[mostRecentDay.meds.length - 1];

	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="div">
					Most Recent Medication: {mostRecentMedication.name} at {mostRecentMedication.time}
				</Typography>
				{schedule.map((medication) => (
					<div key={medication.date}>
						<Typography variant="h6" component="div">
							{medication.date}
						</Typography>
						<List>
							{medication.meds.map((med) => (
								<ListItem key={med.name}>
									<ListItemText primary={med.name} secondary={med.time} />
								</ListItem>
							))}
						</List>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export default MedicationSchedule;