import React, { useState, useEffect, useRef, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { searchDrugsByName, searchDrugsByProductName } from '../../api/drugAPI';
import { SnackbarContext } from '../../contexts/SnackbarContext';

function DrugAutocomplete() {
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const timeoutId = useRef(null);

	useEffect(() => {
		if (inputValue) {
			if (timeoutId.current) {
				clearTimeout(timeoutId.current); // clear the previous timer
			}

			timeoutId.current = setTimeout(async () => { // set a new timer
				try {
					const [drugsByName, drugsByProductName] = await Promise.all([
						searchDrugsByName(inputValue),
						searchDrugsByProductName(inputValue),
					]);
					const combinedDrugs = [...drugsByName, ...drugsByProductName];
					const uniqueDrugs = Array.from(new Set(combinedDrugs.map((drug) => JSON.stringify(drug)))).map(
						(drug) => JSON.parse(drug)
					);
					setOptions(uniqueDrugs);
				} catch (error) {
					setSnackbarMessage('An error occurred while fetching drugs');
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
				}
			}, 300); // delay of 300ms
		}
	}, [inputValue, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]);

	return (
		<Autocomplete
			options={options}
			getOptionLabel={(option) => {
				if (option.products && option.products.length > 0) {
					return `${option.name} (${option.products.map(product => product.name).join(', ')})`;
				} else {
					return option.name;
				}
			}}
			filterOptions={(options, params) => {
				const filtered = options.filter((option) => {
					const drugNameMatches = option.name.toLowerCase().startsWith(params.inputValue.toLowerCase());
					const productNameMatches = option.products.some(product => product.name.toLowerCase().startsWith(params.inputValue.toLowerCase()));
					return drugNameMatches || productNameMatches;
				});
				return filtered;
			}}
			style={{ width: 300 }}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} label="Drug or Product" variant="outlined" />}
			autoHighlight
			autoSelect
		/>
	);
}

export default DrugAutocomplete;