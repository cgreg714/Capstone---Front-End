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

        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', response.data.token);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async (callback) => {
    console.log("🚀 ~ file: loginAPI.jsx:35 ~ logout ~ callback:", callback)
    try {
        const response = await api.get('/logout');

        localStorage.removeItem('userId');
        localStorage.removeItem('token');

        if (typeof callback === 'function') {
            callback();
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};