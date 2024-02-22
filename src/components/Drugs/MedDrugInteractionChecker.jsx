import React, { useContext, useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';
import MedicationAutocomplete from '../Medications/MedAutocomplete';

function MedDrugInteractionChecker() {
    const { drugs } = useContext(DrugContext);
    const [medication, setMedication] = useState(null);
    const [drug, setDrug] = useState(null);
    const [interaction, setInteraction] = useState(null);

    const checkInteraction = useCallback(async () => {
        if (medication && drug) {
            try {
                const interaction = await getInteractionBetweenTwoDrugs(medication.associatedDrug['drugbank-id'][0], drug['drugbank-id'][0]);
                setInteraction(interaction);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setInteraction({ description: 'No interaction found.' });
                } else {
                    console.error(error);
                }
            }
        }
    }, [medication, drug]);

    useEffect(() => {
        checkInteraction();
    }, [checkInteraction]);

    return (
        <div>
            <MedicationAutocomplete
                onChange={(event, newValue) => {
                    setMedication(newValue);
                }}
            />
            <Autocomplete
                options={drugs}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={(event, newValue) => {
                    setDrug(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Drug" variant="outlined" />}
            />
            {interaction && <p>Interaction: {interaction.description}</p>}
        </div>
    );
}

export default MedDrugInteractionChecker;