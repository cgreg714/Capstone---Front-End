import React, { createContext, useState } from 'react';
import {
	getOneUser,
	updateUser as updateUserAPI,
	deleteUser as deleteUserAPI,
	addProfileToUser as addProfileToUserAPI,
	removeProfileFromUser as removeProfileFromUserAPI,
} from '../api/userAPI';
import { signup, login, logout } from '../api/loginAPI';
import { ProfileProvider } from './ProfileContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const signupUser = async (userDetails) => {
		try {
			const newUser = await signup(userDetails);
			setUser(newUser);
		} catch (error) {
			console.error('Failed to sign up:', error);
		}
	};

	const loginUser = async (credentials) => {
		try {
			const loggedInUser = await login(credentials);
			setUser(loggedInUser);
		} catch (error) {
			console.error('Failed to log in:', error);
		}
	};

	const logoutUser = async () => {
		try {
			await logout();
			setUser(null);
			localStorage.removeItem('token');
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	const fetchUser = async (userId) => {
		try {
			const userData = await getOneUser(userId);
			setUser(userData);
		} catch (error) {
			console.error('Failed to fetch user:', error);
		}
	};

	const updateUser = async (userId, updatedUser) => {
		try {
			const userData = await updateUserAPI(userId, updatedUser);
			setUser(userData);
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};

	const deleteUser = async (userId) => {
		try {
			await deleteUserAPI(userId);
			setUser(null);
		} catch (error) {
			console.error('Failed to delete user:', error);
		}
	};

	const addProfileToUser = async (userId, profileId) => {
		try {
			const userData = await addProfileToUserAPI(userId, profileId);
			setUser(userData);
		} catch (error) {
			console.error('Failed to add profile to user:', error);
		}
	};

	const removeProfileFromUser = async (userId, profileId) => {
		try {
			const userData = await removeProfileFromUserAPI(userId, profileId);
			setUser(userData);
		} catch (error) {
			console.error('Failed to remove profile from user:', error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				fetchUser,
				signup: signupUser,
				login: loginUser,
				logout: logoutUser,
				updateUser,
				deleteUser,
				addProfileToUser,
				removeProfileFromUser,
			}}
		>
			<ProfileProvider userId={user?.id}>{children}</ProfileProvider>
		</UserContext.Provider>
	);
};
