import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { searchDrugsByName, searchDrugsByProductName } from '../../api/drugAPI';

function DrugAutocomplete() {
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

    const fetchDrugs = async (query) => {
        try {
            const [drugsByName, drugsByProductName] = await Promise.all([
                searchDrugsByName(query),
                searchDrugsByProductName(query)
            ]);
            const combinedDrugs = [...drugsByName, ...drugsByProductName];
            const uniqueDrugs = Array.from(new Set(combinedDrugs.map(drug => JSON.stringify(drug)))).map(drug => JSON.parse(drug));
            setOptions(uniqueDrugs);
        } catch (error) {
            console.error(error);
        }
    };

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
				fetchDrugs(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} label="Drug or Product" variant="outlined" />}
			autoHighlight
			autoSelect
		/>
	);
}

export default DrugAutocomplete;
