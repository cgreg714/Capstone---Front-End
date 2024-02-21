import React, { useContext } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MedicationContext } from '../../contexts/MedicationContext';

const MedicationAutocomplete = ({ onChange }) => {
    const { medications } = useContext(MedicationContext);

    return (
        <Autocomplete
            id="medication-autocomplete"
            options={medications}
            getOptionLabel={(option) => option.name}
            onChange={onChange}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Medication" />}
            autoHighlight
			autoSelect
        />
    );
};

export default MedicationAutocomplete;