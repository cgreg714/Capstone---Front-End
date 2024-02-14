import React, { useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	FormControlLabel,
	Switch,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

function MedicationSubmitForm() {
	const [frequency, setFrequency] = useState('');

	const handleChange = (event) => {
		setFrequency(event.target.value);
	};

	return (
		<div>
			<Card sx={{ mb: 2 }}>
				<CardContent>
					<Typography variant="h5" component="div">
						Medication Details
					</Typography>
					<TextField label="Medication Name" fullWidth margin="normal" />
					<TextField label="Doses" fullWidth margin="normal" />
					<TextField label="Notes" fullWidth margin="normal" multiline rows={4} />
				</CardContent>
			</Card>

			<Card>
				<CardContent>
					<Typography variant="h5" component="div">
						Set Reminder
					</Typography>
					<FormControlLabel control={<Switch />} label="Enable Reminder" />
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<FormControl fullWidth>
							<InputLabel id="frequency-label">Frequency</InputLabel>
							<Select
								labelId="frequency-label"
								id="frequency"
								value={frequency}
								label="Frequency"
								onChange={handleChange}
							>
								<MenuItem value={'daily'}>Daily</MenuItem>
								<MenuItem value={'twiceADay'}>Twice a day</MenuItem>
							</Select>
						</FormControl>
						<TimePicker label="Alarm 1" />
						<TimePicker label="Alarm 2" />
					</Box>
				</CardContent>
			</Card>
		</div>
	);
}

export default MedicationSubmitForm;
