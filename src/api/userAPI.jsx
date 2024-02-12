import api from './';

export const getOneUser = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, user) => {
    try {
        const response = await api.put(`/user/${userId}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get(`/user`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeUserRole = async (userId, role) => {
    try {
        const response = await api.patch(`/user/${userId}`, role);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProfileToUser = async (userId, profileId) => {
    try {
        const response = await api.post(`/user/${userId}/addProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProfileFromUser = async (userId, profileId) => {
    try {
        const response = await api.post(`/user/${userId}/removeProfile/${profileId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};