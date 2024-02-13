export const getAllMedicationsForProfile = async (userId, profileId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addDrugToMedication = async (userId, profileId, medId, drugId) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/drugs/${drugId}`);
        
        const medications = await getAllMedicationsForProfile(userId, profileId);

        for (let i = 0; i < medications.length; i++) {
            for (let j = i + 1; j < medications.length; j++) {
                const interaction = await getInteractionBetweenTwoDrugs(medications[i].associatedDrug, medications[j].associatedDrug);
                if (interaction) {
                    console.log(`Interaction found between ${medications[i].name} and ${medications[j].name}: ${interaction}`);
                }
            }
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};