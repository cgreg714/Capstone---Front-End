import React, { createContext, useState, useEffect } from 'react';
import {
	getOneUser,
	updateUser as updateUserAPI,
	deleteUser as deleteUserAPI,
	addProfileToUser as addProfileToUserAPI,
	removeProfileFromUser as removeProfileFromUserAPI,
} from '../api/userAPI';
import { logout } from '../api/loginAPI';
import { ProfileProvider } from './ProfileContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialUserId = localStorage.getItem('userId');
    const [userId, setUserId] = useState(initialUserId || null);
	const [user, setUser] = useState(null);


	const logoutUser = async () => {
		try {
			await logout();
			setUserId(null);
			localStorage.removeItem('token');
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	useEffect(() => {
        fetchUser(userId);
    }, [userId]);
	
	const fetchUser = async (userId) => {
		try {
			const userData = await getOneUser(userId);
			setUserId(userData);
		} catch (error) {
			console.error('Failed to fetch user:', error);
		}
	};

	const updateUser = async (userId, updatedUser) => {
		try {
			const userData = await updateUserAPI(userId, updatedUser);
			setUserId(userData);
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};

	const deleteUser = async (userId) => {
		try {
			await deleteUserAPI(userId);
			setUserId(null);
		} catch (error) {
			console.error('Failed to delete user:', error);
		}
	};


	return (
		<UserContext.Provider
			value={{
				userId,
                user,
                setUser,
				fetchUser,
				logout: logoutUser,
				updateUser,
				deleteUser,
			}}
		>
			<ProfileProvider userId={userId}>{children}</ProfileProvider>
		</UserContext.Provider>
	);
};
