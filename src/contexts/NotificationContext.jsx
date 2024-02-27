import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ProfileContext } from './ProfileContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { profiles } = useContext(ProfileContext);
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
    }, []);

    const removeNotification = (notificationId) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
    };

    useEffect(() => {
        profiles.forEach(profile => {
            profile.medications.forEach((medication) => {
                if (medication.dose < 10) {
                    addNotification({
                        id: medication._id,
                        message: `You are low on ${medication.name}. Please refill your prescription.`,
                    });
                }
            });
        });
    }, [profiles, addNotification]);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};