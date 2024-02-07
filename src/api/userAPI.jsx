import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `http://${IP}:${PORT}`;

export const getOneUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, user) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeUserRole = async (role) => {
    try {
        const response = await axios.patch(`${API_URL}/changeUserRole`, role);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProfileToUser = async (userId, profileId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/addProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProfileFromUser = async (userId, profileId) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/removeProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};