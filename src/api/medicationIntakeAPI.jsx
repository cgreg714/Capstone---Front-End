import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const getAllIntakes = async (userId, profileId, medId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createIntake = async (userId, profileId, medId, intake) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake`, intake);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAllIntakes = async (userId, profileId, medId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getIntake = async (userId, profileId, medId, intakeId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateIntake = async (userId, profileId, medId, intakeId, updatedIntake) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`, updatedIntake);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteIntake = async (userId, profileId, medId, intakeId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};