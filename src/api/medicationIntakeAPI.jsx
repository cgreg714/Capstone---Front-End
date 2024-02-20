import api from './';

export const getAllIntakes = async (userId, profileId, medId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/${medId}/intake`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAllIntakes = async (userId, profileId, medId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/medications/${medId}/intake`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createIntake = async (userId, profileId, medId, intake) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/medications/${medId}/intake`, intake);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getIntake = async (userId, profileId, medId, intakeId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateIntake = async (userId, profileId, medId, intakeId, updatedIntake) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`, updatedIntake);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteIntake = async (userId, profileId, medId, intakeId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/medications/${medId}/intake/${intakeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};