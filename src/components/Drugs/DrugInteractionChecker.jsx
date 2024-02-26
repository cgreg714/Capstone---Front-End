import React, { useContext, useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';

function DrugInteractionChecker() {
	const { drugs } = useContext(DrugContext);
	const [drug1, setDrug1] = useState(null);
	const [drug2, setDrug2] = useState(null);
	const [interaction, setInteraction] = useState(null);

	const checkInteraction = useCallback(async () => {
		if (drug1 && drug2) {
			try {
				const response = await getInteractionBetweenTwoDrugs(drug1['drugbank-id'], drug2['drugbank-id']);
				if (response.message) {
					setInteraction({ description: response.message });
				} else {
					setInteraction(response);
				}
			} catch (error) {
				setInteraction({ description: 'An error occurred while checking for interactions.' });
			}
		}
	}, [drug1, drug2]);

	useEffect(() => {
		checkInteraction();
	}, [checkInteraction]);

	return (
		<div>
			<Autocomplete
				options={drugs}
				getOptionLabel={(option) => option.name}
				style={{ width: 300 }}
				onChange={(event, newValue) => {
					setDrug1(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Drug 1" variant="outlined" />}
			/>
			<Autocomplete
				options={drugs}
				getOptionLabel={(option) => option.name}
				style={{ width: 300 }}
				onChange={(event, newValue) => {
					setDrug2(newValue);
				}}
				renderInput={(params) => <TextField {...params} label="Drug 2" variant="outlined" />}
			/>
			{interaction && <p>Interaction: {interaction.description}</p>}
		</div>
	);
}

export default DrugInteractionChecker;
