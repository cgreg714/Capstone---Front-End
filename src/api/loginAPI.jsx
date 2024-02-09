import axios from 'axios';

const IP = process.env.REACT_APP_IP;
const PORT = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `${IP}:${PORT}`;

export const signup = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (callback) => {
    try {
        const response = await axios.get(`${API_URL}/logout`);
        callback();
        return response.data;
    } catch (error) {
        throw error;
    }
};