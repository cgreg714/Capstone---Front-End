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

export const getInteractionBetweenTwoDrugs = async (drugId1, drugId2) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/${drugId1}/interactions/${drugId2}`);
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

export const searchDrugsByName = async (drugName) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/searchDrugsByName`, { params: { q: drugName } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchDrugsByProductName = async (productName) => {
    try {
        const response = await axios.get(`${API_URL}/drugs/searchByProductName`, { params: { q: productName } });
        return response.data;
    } catch (error) {
        throw error;
    }
}; 