import api from './';
import { getInteractionBetweenTwoDrugs } from './drugAPI';

export const getAllMedications = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createMedication = async (userId, profileId, medication) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/medications`, medication);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAllMedications = async (userId, profileId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/medications`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMedication = async (userId, profileId, medId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/${medId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateMedication = async (userId, profileId, medId, updatedMedication) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/medications/${medId}`, updatedMedication);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteMedication = async (userId, profileId, medId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/medications/${medId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByPrescriber = async (userId, profileId, prescriber) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/prescriber/${prescriber}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByName = async (userId, profileId, name) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/name/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByDate = async (userId, profileId, dateAdded) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/date/${dateAdded}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addDrugToMedication = async (userId, profileId, medId, drugId) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/medications/${medId}/drugs/${drugId}`);
        
        const medications = await getAllMedications(userId, profileId);

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

export const removeDrugFromMedication = async (userId, profileId, medId, drugId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/medications/${medId}/drugs/${drugId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const toggleField = async (userId, profileId, medId, field) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/medications/${medId}/toggle/${field}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};