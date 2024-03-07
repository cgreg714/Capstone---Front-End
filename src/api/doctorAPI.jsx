import api from './';

export const getAllDoctors = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/doctors`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const createDoctor = async (userId, profileId, doctor) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/doctors`, doctor);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const getDoctor = async (userId, profileId, doctorId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const updateDoctor = async (userId, profileId, doctorId, updatedDoctor) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/doctors/${doctorId}`, updatedDoctor);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const deleteDoctor = async (userId, profileId, doctorId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};