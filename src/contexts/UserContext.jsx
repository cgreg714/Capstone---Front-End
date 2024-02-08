import React, { createContext, useState, useEffect } from 'react';
import { getOneUser } from '../api/userAPI';
import { ProfileProvider } from './ProfileContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'dark');

    const fetchUser = async (userId) => {
        try {
            const userData = await getOneUser(userId);
            setUser(userData);
            const storedTheme = localStorage.getItem(`userTheme${userId}`);
            if (storedTheme) {
                setTheme(storedTheme);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, theme, setTheme }}>
            <ProfileProvider>
                {children}
            </ProfileProvider>
        </UserContext.Provider>
    );
};