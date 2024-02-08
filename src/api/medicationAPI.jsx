import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const getAllMedications = async (userId, profileId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createMedication = async (userId, profileId, medication) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/medications`, medication);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAllMedications = async (userId, profileId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/medications`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMedicationById = async (userId, profileId, medId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateMedication = async (userId, profileId, medId, updatedMedication) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}`, updatedMedication);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteMedication = async (userId, profileId, medId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByPrescriber = async (userId, profileId, prescriber) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/prescriber/${prescriber}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByName = async (userId, profileId, name) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/name/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByDate = async (userId, profileId, dateAdded) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/date/${dateAdded}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addDrugToMedication = async (userId, profileId, medId, drugId) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/drugs/${drugId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeDrugFromMedication = async (userId, profileId, medId, drugId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/drugs/${drugId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const toggleField = async (userId, profileId, medId, field) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/toggle/${field}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};