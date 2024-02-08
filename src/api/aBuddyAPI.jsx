import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const createABuddy = async (userId, profileId, aBuddy) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/aBuddy`, aBuddy);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllABuddies = async (userId, profileId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/aBuddy`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOneABuddy = async (userId, profileId, aBuddyId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateABuddy = async (userId, profileId, aBuddyId, updatedABuddy) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`, updatedABuddy);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteABuddy = async (userId, profileId, aBuddyId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/aBuddy/${aBuddyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};