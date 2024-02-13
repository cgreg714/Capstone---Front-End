import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const getAllProfiles = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProfile = async (userId, profile) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile`, profile);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (userId, profileId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (userId, profileId, updatedProfile) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}`, updatedProfile);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProfile = async (userId, profileId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};