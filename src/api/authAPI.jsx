import api from '.';

export const signup = async (user) => {
    try {
        const response = await api.post('/signup', user);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const login = async (user) => {
    try {
        const response = await api.post('/login', user);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
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
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const checkToken = async () => {
    try {
        const response = await api.get('/check-token');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const sendPasswordResetEmail = async (email) => {
    try {
        const response = await api.post('/request-password-reset', { email });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await api.post(`/reset-password/${token}`, { password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};