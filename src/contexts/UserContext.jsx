import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
	getOneUser,
	updateUser as updateUserAPI,
	deleteUser as deleteUserAPI,
	addProfileToUser as addProfileToUserAPI,
	removeProfileFromUser as removeProfileFromUserAPI,
} from '../api/userAPI';
import { logout } from '../api/authAPI';
import { ProfileProvider } from './ProfileContext';
import { SnackbarContext } from '../contexts/SnackbarContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const initialToken = localStorage.getItem('token');
	const [userId, setUserId] = useState(initialToken ? jwtDecode(initialToken)._id : null);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	// eslint-disable-next-line
	const [isCheckingToken, setIsCheckingToken] = useState(true);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const logoutUser = async () => {
		try {
			await logout();
			setUserId(null);
			setUser(null);
			localStorage.removeItem('token');
		} catch (error) {
			setSnackbarMessage('Failed to log out');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const setUserIdAndFetchUser = async (id) => {
		setUserId(id);
		const userData = await fetchUser(id);
		if (userData) {
			setUser(userData);
		}
	};

	const fetchUser = useCallback(
		async (userId) => {
			try {
				const userData = await getOneUser(userId);
				if (!userData) {
					throw new Error('User data is undefined');
				}
				return userData;
			} catch (error) {
				setSnackbarMessage('Failed to fetch user');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		},
		[setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]
	);

	const updateUser = async (userId, updatedUser) => {
		try {
			const userData = await updateUserAPI(userId, updatedUser);
			setUserId(userData);
		} catch (error) {
			setSnackbarMessage('Failed to update user');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const deleteUser = async (userId) => {
		try {
			await deleteUserAPI(userId);
			setUserId(null);
		} catch (error) {
			setSnackbarMessage('Failed to delete user');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const addProfileToUser = async (profileId) => {
		try {
			const updatedUser = await addProfileToUserAPI(userId, profileId);
			setUser(updatedUser);
		} catch (error) {
			setSnackbarMessage('Failed to add profile to user');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	const removeProfileFromUser = async (profileId) => {
		try {
			const updatedUser = await removeProfileFromUserAPI(userId, profileId);
			setUser(updatedUser);
		} catch (error) {
			setSnackbarMessage('Failed to remove profile from user');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			if (initialToken) {
				const decodedToken = jwtDecode(initialToken);
				if (decodedToken.exp * 1000 < Date.now()) {
					localStorage.removeItem('token');
				} else {
					const userData = await fetchUser(decodedToken._id);
					if (userData) {
						setUserId(decodedToken._id);
						setUser(userData);
					}
				}
			}
			setIsCheckingToken(false);
			setIsLoading(false);
		};

		fetchUserData();
	}, [initialToken, fetchUser]);

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
