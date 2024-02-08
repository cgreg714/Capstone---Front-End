import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const getOneUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, user) => {
    try {
        const response = await axios.put(`${API_URL}/user/${userId}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeUserRole = async (userId, role) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}`, role);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProfileToUser = async (userId, profileId) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/addProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProfileFromUser = async (userId, profileId) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/removeProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};