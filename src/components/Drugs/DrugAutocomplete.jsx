import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { searchDrugsByName, searchDrugsByProductName } from '../../api/drugAPI';

function DrugAutocomplete({ setSelectedDrugId }) {
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (inputValue) {
			const fetchDrugs = async () => {
				try {
					const [drugsByName, drugsByProductName] = await Promise.all([
						searchDrugsByName(inputValue),
						searchDrugsByProductName(inputValue)
					]);
					const combinedDrugs = [...drugsByName, ...drugsByProductName];
					const uniqueDrugs = Array.from(new Set(combinedDrugs.map(drug => JSON.stringify(drug)))).map(drug => JSON.parse(drug));
					setOptions(uniqueDrugs);
				} catch (error) {
					console.error(error);
				}
			};
			fetchDrugs();
		}
	}, [inputValue]);

	return (
		<Autocomplete
			options={options}
			getOptionLabel={(option) => {
				if (option.products && option.products.length > 0) {
					return `${option.name} (${option.products[0].name})`;
				} else {
					return option.name;
				}
			}}
			style={{ width: 300 }}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			onChange={(event, newValue) => {
                setSelectedDrugId(newValue._id);
            }}
			renderInput={(params) => <TextField {...params} label="Drug or Product" variant="outlined" />}
			autoHighlight
			autoSelect
		/>
	);
}

export default DrugAutocomplete;