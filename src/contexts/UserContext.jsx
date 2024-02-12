import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
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
	const initialToken = localStorage.getItem('token');
	const initialUserId = localStorage.getItem('userId');
	const [userId, setUserId] = useState(initialUserId || null);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	
	console.log("🚀 ~ file: UserContext.jsx:19 ~ UserProvider ~ userId:", userId)
	useEffect(() => {
		const fetchUserData = async () => {
			if (initialToken) {
				const decodedToken = jwtDecode(initialToken);
				console.log("🚀 ~ file: UserContext.jsx:27 ~ fetchUserData ~ decodedToken:", decodedToken)
				if (decodedToken.exp * 1000 < Date.now()) {
					localStorage.removeItem('token');
				} else {
					const userData = await fetchUser(decodedToken.userId);
					if (userData) {
						setUserId(decodedToken.userId);
						setUser(userData);
					}
				}
			}
			setIsLoading(false);
		};

		fetchUserData();
	}, [initialToken]);

	const logoutUser = async () => {
		try {
			await logout();
			setUserId(null);
			setUser(null);
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	const setUserIdAndFetchUser = async (id) => {
		setUserId(id);
		const userData = await fetchUser(id);
		if (userData) {
			setUser(userData);
		}
	};

	const fetchUser = async (userId) => {
		try {
			const userData = await getOneUser(userId);
			console.log('🚀 ~ file: UserContext.jsx:42 ~ fetchUser ~ userData:', userData);
			if (!userData) {
				throw new Error('User data is undefined');
			}
			return userData;
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

	const addProfileToUser = async (profileId) => {
		try {
			const updatedUser = await addProfileToUserAPI(userId, profileId);
			setUser(updatedUser);
		} catch (error) {
			console.error('Failed to add profile to user:', error);
		}
	};

	const removeProfileFromUser = async (profileId) => {
		try {
			const updatedUser = await removeProfileFromUserAPI(userId, profileId);
			setUser(updatedUser);
		} catch (error) {
			console.error('Failed to remove profile from user:', error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				userId,
				setUserId: setUserIdAndFetchUser,
				user,
				setUser,
				fetchUser,
				logout: logoutUser,
				updateUser,
				deleteUser,
				addProfileToUser,
				removeProfileFromUser,
				isLoading,
			}}
		>
			<ProfileProvider userId={userId}>{children}</ProfileProvider>
		</UserContext.Provider>
	);
};
