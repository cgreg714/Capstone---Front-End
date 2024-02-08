import React, { useContext, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';

function DrugInteractionChecker() {
    const { drugs } = useContext(DrugContext);
    const [drug1, setDrug1] = useState(null);
    const [drug2, setDrug2] = useState(null);
    const [interaction, setInteraction] = useState(null);

    const checkInteraction = async () => {
        if (drug1 && drug2) {
            console.log("🚀 ~ file: DrugInteractionChecker.jsx:15 ~ checkInteraction ~ drug2:", drug2)
            console.log("🚀 ~ file: DrugInteractionChecker.jsx:15 ~ checkInteraction ~ drug1:", drug1['drugbank-id'][0])
            try {
                const interaction = await getInteractionBetweenTwoDrugs(drug1['drugbank-id'][0], drug2['drugbank-id'][0]);
                setInteraction(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        checkInteraction();
    }, [drug1, drug2]);

    return (
        <div>
            <Autocomplete
                options={drugs}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={(event, newValue) => {
                    setDrug1(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Drug 1" variant="outlined" />}
            />
            <Autocomplete
                options={drugs}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={(event, newValue) => {
                    setDrug2(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Drug 2" variant="outlined" />}
            />
            {interaction && <p>Interaction: {interaction.description}</p>}
        </div>
    );
}

export default DrugInteractionChecker;