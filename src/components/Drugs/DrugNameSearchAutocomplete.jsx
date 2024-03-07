import React, { useState, useEffect, useContext, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import LoadingBar from '../Loading/LoadingBar';
import { debounce } from 'lodash';
import { searchDrugsByName, searchDrugsByProductName } from '../../api/drugAPI';

function DrugSearchByNameAutocomplete({ reset, onDrugSelected }) {
	const { isLoading, setSelectedDrugId } = useContext(DrugContext);
	const [inputValue, setInputValue] = useState('');
	const [drugsList, setDrugsList] = useState([]);
	const [selectedDrug, setSelectedDrug] = useState(null);

	const options = useMemo(() => drugsList, [drugsList]);

	const debouncedSearch = debounce(async (searchValue) => {
		if (searchValue) {
			const resultsByName = await searchDrugsByName(searchValue);
			const resultsByProductName = await searchDrugsByProductName(searchValue);
			const results = [...resultsByName, ...resultsByProductName];
			const uniqueResults = Array.from(new Set(results.map((drug) => drug.name))).map((name) => {
				return results.find((drug) => drug.name === name);
			});
			setDrugsList(uniqueResults);
		} else {
			setDrugsList([]);
		}
	}, 200);

	useEffect(() => {
		if (reset) {
			setSelectedDrugId(null);
		}
	}, [reset, setSelectedDrugId]);

	useEffect(() => {
		debouncedSearch(inputValue);
	}, [inputValue, debouncedSearch]);

	if (isLoading) {
		return <LoadingBar />;
	}

	return (
		<Autocomplete
			options={options}
			getOptionLabel={(option) => {
				if (option.products && option.products.some(product => product.name.toLowerCase().startsWith(inputValue.toLowerCase()))) {
					return option.name;
				} else {
					return '';
				}
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			value={drugsList.find((drug) => drug._id === selectedDrug?._id) || null}
			onChange={(event, newValue) => {
				setSelectedDrug(newValue);
				setSelectedDrugId(newValue?._id);
				if (typeof onDrugSelected === 'function') {
					onDrugSelected(newValue?._id);
				}
			}}
			renderInput={(params) => <TextField {...params} label="Drug" variant="outlined" />}
			autoSelect
			autoHighlight
		/>
	);
}

export default DrugSearchByNameAutocomplete;