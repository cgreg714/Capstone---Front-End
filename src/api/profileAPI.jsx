import api from './';

export const getAllProfiles = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProfile = async (userId, profile) => {
    try {
        const response = await api.post(`/user/${userId}/profile`, profile);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (userId, profileId, updatedProfile) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}`, updatedProfile);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProfile = async (userId, profileId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};