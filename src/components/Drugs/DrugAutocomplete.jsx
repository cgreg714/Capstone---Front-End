import React, { useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import LoadingBar from '../../components/LoadingScreen';

function DrugAutocomplete({ reset }) {
	const { drugs, isLoading, setSelectedDrugId } = useContext(DrugContext);
	useEffect(() => {
		if (reset) {
			setSelectedDrugId(null);
		}
	}, [reset, setSelectedDrugId]);

	if (isLoading) {
		return <LoadingBar />;
	}

	return (
		<Autocomplete
			options={drugs}
			getOptionLabel={(option) => option.name}
			style={{ width: 300 }}
			onChange={(event, newValue) => {
				setSelectedDrugId(newValue?._id);
			}}
			renderInput={(params) => <TextField {...params} label="Search for Drug" variant="outlined" />}
			autoHighlight
			autoSelect
		/>
	);
}

export default DrugAutocomplete;