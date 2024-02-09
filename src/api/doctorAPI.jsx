import axios from 'axios';
import api from './index';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;


export const getAllDoctors = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/doctors`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createDoctor = async (userId, profileId, doctor) => {
    try {
        const response = await axios.post(`${API_URL}/user/${userId}/profile/${profileId}/doctors`, doctor);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOneDoctor = async (userId, profileId, doctorId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/profile/${profileId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateDoctor = async (userId, profileId, doctorId, updatedDoctor) => {
    try {
        const response = await axios.patch(`${API_URL}/user/${userId}/profile/${profileId}/doctors/${doctorId}`, updatedDoctor);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDoctor = async (userId, profileId, doctorId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}/profile/${profileId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};