import api from './';

export const signup = async (user) => {
    try {
        const response = await api.post('/signup', user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (user) => {
    try {
        const response = await api.post('/login', user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (callback) => {
    try {
        const response = await api.get('/logout');
        if (typeof callback === 'function') {
            callback();
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkToken = async () => {
    try {
        const response = await api.get('/check-token');
        return response.data;
    } catch (error) {
        throw error;
    }
};