import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';

const MedicationAutocomplete = () => {
    const { medications } = useContext(MedicationContext);

    return (
        <Autocomplete
            id="medication-autocomplete"
            options={medications}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Medication" />}
        />
    );
};

export default MedicationAutocomplete;