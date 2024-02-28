import api from '.';

export const createPharmacy = async (userId, profileId, pharmacy) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/pharmacy`, pharmacy);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const getAllPharmacies = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/pharmacy`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const getOnePharmacy = async (userId, profileId, pharmacyId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/pharmacy/${pharmacyId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const updatePharmacy = async (userId, profileId, pharmacyId, updatedPharmacy) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/pharmacy/${pharmacyId}`, updatedPharmacy);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const deletePharmacy = async (userId, profileId, pharmacyId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/pharmacy/${pharmacyId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};