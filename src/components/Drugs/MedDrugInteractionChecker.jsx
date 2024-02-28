import React, { useContext, useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import { MedicationContext } from '../../contexts/MedicationContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';

function MedDrugInteractionChecker() {
	const { drugs } = useContext(DrugContext);
	const { medications } = useContext(MedicationContext);
	const [selectedMedication, setSelectedMedication] = useState(null);
	const [selectedDrug, setSelectedDrug] = useState(null);
	const [interaction, setInteraction] = useState(null);

	const checkInteraction = useCallback(async () => {
		if (selectedMedication && selectedDrug) {
			try {
				const response = await getInteractionBetweenTwoDrugs(
					selectedMedication.associatedDrug['drugbank-id'],
					selectedDrug['drugbank-id']
				);
				if (response.message) {
					setInteraction({ description: response.message });
				} else {
					setInteraction(response);
				}
			} catch (error) {
				setInteraction({ description: 'An error occurred while checking for interactions.' });
			}
		}
	}, [selectedMedication, selectedDrug]);

	useEffect(() => {
		checkInteraction();
	}, [checkInteraction]);

	return (
		<div>
			<Autocomplete
				options={medications}
				getOptionLabel={(option) => option.name}
				style={{ width: 300 }}
				onChange={(event, newValue) => {
					setSelectedMedication(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Medication" variant="outlined" />}
			/>
			<Autocomplete
				options={drugs}
				getOptionLabel={(option) => option.name}
				style={{ width: 300 }}
				onChange={(event, newValue) => {
					setSelectedDrug(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Drug" variant="outlined" />}
			/>
			{interaction && <p>Interaction: {interaction.description}</p>}
		</div>
	);
}

export default MedDrugInteractionChecker;