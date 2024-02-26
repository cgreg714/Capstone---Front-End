import React, { useContext, useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';
import MedicationAutocomplete from '../Medications/MedAutocomplete';

function MedDrugInteractionChecker() {
	const { drugs } = useContext(DrugContext);
	const [medication, setMedication] = useState(null);
	const [drug, setDrug] = useState(null);
	const [interaction, setInteraction] = useState(null);

	const checkInteraction = useCallback(async () => {
		if (medication && drug) {
			try {
				const response = await getInteractionBetweenTwoDrugs(
					medication.associatedDrug['drugbank-id'],
					drug['drugbank-id']
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
	}, [medication, drug]);

	useEffect(() => {
		checkInteraction();
	}, [checkInteraction]);

	return (
		<div>
			<MedicationAutocomplete
				onChange={(event, newValue) => {
					setMedication(newValue);
				}}
			/>
			<Autocomplete
				options={drugs}
				getOptionLabel={(option) => option.name}
				style={{ width: 300 }}
				onChange={(event, newValue) => {
					setDrug(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Drug" variant="outlined" />}
			/>
			{interaction && <p>Interaction: {interaction.description}</p>}
		</div>
	);
}

export default MedDrugInteractionChecker;
