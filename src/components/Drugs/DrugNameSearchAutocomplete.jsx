import React, { useState, useEffect, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import LoadingBar from '../../components/LoadingScreen';
import { debounce } from 'lodash';
import { searchDrugsByName } from '../../api/drugAPI';

function DrugSearchByNameAutocomplete({ reset }) {
    const { isLoading, setSelectedDrugId } = useContext(DrugContext);
    const [inputValue, setInputValue] = useState('');
    const [drugsList, setDrugsList] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);

    const debouncedSearch = debounce(async (searchValue) => {
        if (searchValue) {
            const results = await searchDrugsByName(searchValue);
            const filteredResults = results.filter(drug => drug.name.toLowerCase().startsWith(searchValue.toLowerCase()));
            setDrugsList(filteredResults);
        } else {
            setDrugsList([]);
        }
    }, 300);

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
            options={drugsList}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            value={drugsList.find(drug => drug._id === selectedDrug?._id) || null}
            onChange={(event, newValue) => {
                setSelectedDrug(newValue);
                setSelectedDrugId(newValue?._id);
            }}
            renderInput={(params) => <TextField {...params} label="Search for Drug" variant="outlined" />}
            autoHighlight
        />
    );
}

export default DrugSearchByNameAutocomplete;