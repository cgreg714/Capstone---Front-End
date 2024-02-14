import api from './';

export const createABuddy = async (userId, profileId, aBuddy) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/aBuddy`, aBuddy);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllABuddies = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/aBuddy`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getABuddy = async (userId, profileId, aBuddyId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateABuddy = async (userId, profileId, aBuddyId, updatedABuddy) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`, updatedABuddy);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteABuddy = async (userId, profileId, aBuddyId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};