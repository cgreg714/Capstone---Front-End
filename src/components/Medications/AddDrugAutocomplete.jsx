import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { searchDrugsByName, searchDrugsByProductName } from '../../api/drugAPI';

function AddDrugAutocomplete({ setSelectedDrugId }) {
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [selectedValue, setSelectedValue] = useState(null);

	useEffect(() => {
		if (inputValue) {
			const fetchDrugs = async () => {
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
					console.error(error);
				}
			};
			fetchDrugs();
		}
	}, [inputValue]);

	return (
		<Autocomplete
			value={selectedValue}
			options={options}
			getOptionLabel={(option) => {
				if (!option) {
					return '';
				}
				if (option.products && option.products.length > 0) {
					return `${option.name} (${option.products[0].name})`;
				} else {
					return option.name;
				}
			}}
			isOptionEqualToValue={(option, value) => option._id === value._id}
			style={{ width: 300 }}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			onChange={(event, newValue) => {
				setSelectedValue(newValue);
				if (newValue) {
					setSelectedDrugId(newValue._id);
				} else {
					setSelectedDrugId(null);
				}
			}}
			renderInput={(params) => <TextField {...params} label="Drug or Product" variant="outlined" />}
			autoHighlight
			autoSelect
		/>
	);
}

export default AddDrugAutocomplete;
