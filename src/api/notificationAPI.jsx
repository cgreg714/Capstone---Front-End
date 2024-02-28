import api from '.';

export const getAllNotifications = async (userId, profileId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/notifications`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const createNotification = async (userId, profileId, notification) => {
    try {
        const response = await api.post(`/user/${userId}/profile/${profileId}/notifications`, notification);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const getNotification = async (userId, profileId, notificationId) => {
    try {
        const response = await api.get(`/user/${userId}/profile/${profileId}/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const updateNotification = async (userId, profileId, notificationId, updatedNotification) => {
    try {
        const response = await api.patch(`/user/${userId}/profile/${profileId}/notifications/${notificationId}`, updatedNotification);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const deleteNotification = async (userId, profileId, notificationId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};

export const deleteAllNotifications = async (userId, profileId) => {
    try {
        const response = await api.delete(`/user/${userId}/profile/${profileId}/notifications`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw error;
        }
    }
};