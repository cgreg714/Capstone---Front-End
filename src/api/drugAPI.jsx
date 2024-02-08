import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const getAllDrugs = async () => {
    try {
        const response = await axios.get(`${API_URL}/drugs`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSpecificDrugInteractionByDrugbankId = async (drugId, interactionId) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/${drugId}/interactions/${interactionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDrugByDrugbankId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/drugbank-id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDrugByUnii = async (unii) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/unii/${unii}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchDrugs = async (searchParams) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/search-drugs`, { params: searchParams });
        return response.data;
    } catch (error) {
        throw error;
    }
};