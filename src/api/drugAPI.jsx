import api from './';

export const getAllDrugs = async () => {
    try {
        const response = await api.get(`/drugs`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
};

export const getInteractionBetweenTwoDrugs = async (drugId1, drugId2) => {
    try {
        const response = await api.get(`/drugs/${drugId1}/interactions/${drugId2}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
};

export const getDrugByDrugbankId = async (id) => {
    try {
        const response = await api.get(`/drugs/drugbank-id/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
};

export const getDrugByUnii = async (unii) => {
    try {
        const response = await api.get(`/drugs/unii/${unii}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
};

export const searchDrugsByName = async (drugName) => {
    try {
        const response = await api.get(`/drugs/searchDrugsByName`, { params: { q: drugName } });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
};

export const searchDrugsByProductName = async (productName) => {
    try {
        const response = await api.get(`/drugs/searchDrugsByProductName`, { params: { q: productName } });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw error;
        }
    }
}; 