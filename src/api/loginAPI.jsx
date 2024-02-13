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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        if (typeof callback === 'function') {
            callback();
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};