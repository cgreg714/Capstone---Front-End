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

export const sendOTP = async (email) => {
    try {
        const response = await api.post('/send-otp', { email });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const verifyOTP = async (otp) => {
    try {
        const response = await api.post('/verify-otp', { otp });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
    }
};

export const resetPassword = async (otp, password) => {
    try {
        const response = await api.post('/reset-password', { otp, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
    }
};