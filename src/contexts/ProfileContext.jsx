import React, { createContext, useState, useEffect } from 'react';
import { MedicationProvider } from './MedicationContext';
import {
	getAllProfiles as getAllProfilesAPI,
	createProfile as createProfileAPI,
	getProfile as getProfileAPI,
	updateProfile as updateProfileAPI,
	deleteProfile as deleteProfileAPI,
} from '../api/profileAPI';
import {
	getAllDoctors as getAllDoctorsAPI,
	createDoctor as createDoctorAPI,
	getDoctor as getDoctorAPI,
	updateDoctor as updateDoctorAPI,
	deleteDoctor as deleteDoctorAPI,
} from '../api/doctorAPI';
import {
	getAllABuddies as getAllABuddiesAPI,
	createABuddy as createABuddyAPI,
	getABuddy as getABuddyAPI,
	updateABuddy as updateABuddyAPI,
	deleteABuddy as deleteABuddyAPI,
} from '../api/aBuddyAPI';
import { addProfileToUser } from '../api/userAPI';

export const ProfileContext = createContext();

export const ProfileProvider = React.memo(({ children, userId }) => {
	const initialProfileId = localStorage.getItem('profileId');

	console.log('🚀 ~ file: ProfileContext.jsx:28 ~ ProfileProvider ~ userId:', userId);
	const [profiles, setProfiles] = useState([]);
	const [profileId, setProfileId] = useState(initialProfileId || null);

	const [doctors, setDoctors] = useState([]);
	const [abuddies, setABuddies] = useState([]);

	useEffect(() => {
		console.log('ProfileProvider mounted with userId:', userId);

		return () => {
			console.log('ProfileProvider is going to unmount');
		};
	}, []);

	useEffect(() => {
		if (!userId) {
			return;
		}

		const fetchProfiles = async () => {
			try {
				const data = await getAllProfilesAPI(userId);
				setProfiles(data);
			} catch (error) {
				console.error('Failed to fetch profiles:', error);
			}
		};

		fetchProfiles();

		if (!profileId) {
			return;
		}

		const fetchDoctors = async () => {
			try {
				const data = await getAllDoctorsAPI(userId, profileId);
				setDoctors(data);
			} catch (error) {
				console.error('Failed to fetch doctors:', error);
			}
		};

		const fetchABuddies = async () => {
			try {
				const data = await getAllABuddiesAPI(userId, profileId);
				setABuddies(data);
			} catch (error) {
				console.error('Failed to fetch abuddies:', error);
			}
		};

		fetchABuddies();
		fetchDoctors();
	}, [userId, profileId]);

	const createProfile = async (profile) => {
		console.log("🚀 ~ file: ProfileContext.jsx:88 ~ createProfile ~ userId:", userId)
		if (userId) {
			try {
				const newProfile = await createProfileAPI(userId, profile);
				setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
				setProfileId(newProfile._id);
				localStorage.setItem('profileId', newProfile._id);

			} catch (error) {
				console.error('Failed to create profile:', error);
			}
		}
	};

	const getProfile = async (profileId) => {
		if (userId) {
			try {
				const profileData = await getProfileAPI(userId, profileId);
				setProfileId(profileData._id);
			} catch (error) {
				console.error('Failed to fetch profile:', error);
			}
		}
	};

	const updateProfile = async (profileId, updatedProfile) => {
		if (userId) {
			try {
				const updatedProfileData = await updateProfileAPI(userId, profileId, updatedProfile);
				setProfiles((prevProfiles) =>
					prevProfiles.map((profile) => (profile._id === profileId ? updatedProfileData : profile))
				);
			} catch (error) {
				console.error('Failed to update profile:', error);
			}
		}
	};

	const deleteProfile = async (profileId) => {
		if (userId) {
			try {
				await deleteProfileAPI(userId, profileId);
				setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== profileId));
			} catch (error) {
				console.error('Failed to delete profile:', error);
			}
		}
	};

	const createDoctor = async (doctor) => {
		if (userId && profileId) {
			try {
				const newDoctor = await createDoctorAPI(userId, profileId, doctor);
				setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
			} catch (error) {
				console.error('Failed to create doctor:', error);
			}
		}
	};

	const getDoctor = async (doctorId) => {
		if (userId && profileId) {
			try {
				const doctorData = await getDoctorAPI(userId, profileId, doctorId);
				setDoctors((prevDoctors) =>
					prevDoctors.map((doctor) => (doctor._id === doctorId ? doctorData : doctor))
				);
			} catch (error) {
				console.error('Failed to fetch doctor:', error);
			}
		}
	};

	const updateDoctor = async (doctorId, updatedDoctor) => {
		if (userId && profileId) {
			try {
				const updatedDoctorData = await updateDoctorAPI(userId, profileId, doctorId, updatedDoctor);
				setDoctors((prevDoctors) =>
					prevDoctors.map((doctor) => (doctor._id === doctorId ? updatedDoctorData : doctor))
				);
			} catch (error) {
				console.error('Failed to update doctor:', error);
			}
		}
	};

	const deleteDoctor = async (doctorId) => {
		if (userId && profileId) {
			try {
				await deleteDoctorAPI(userId, profileId, doctorId);
				setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
			} catch (error) {
				console.error('Failed to delete doctor:', error);
			}
		}
	};

	const createABuddy = async (aBuddy) => {
		if (userId && profileId) {
			try {
				const newABuddy = await createABuddyAPI(userId, profileId, aBuddy);
				setABuddies((prevABuddies) => [...prevABuddies, newABuddy]);
			} catch (error) {
				console.error('Failed to create aBuddy:', error);
			}
		}
	};

	const getABuddy = async (aBuddyId) => {
		if (userId && profileId) {
			try {
				const aBuddyData = await getABuddyAPI(userId, profileId, aBuddyId);
				setABuddies((prevABuddies) =>
					prevABuddies.map((aBuddy) => (aBuddy._id === aBuddyId ? aBuddyData : aBuddy))
				);
			} catch (error) {
				console.error('Failed to fetch aBuddy:', error);
			}
		}
	};

	const updateABuddy = async (aBuddyId, updatedABuddy) => {
		if (userId && profileId) {
			try {
				const updatedABuddyData = await updateABuddyAPI(userId, profileId, aBuddyId, updatedABuddy);
				setABuddies((prevABuddies) =>
					prevABuddies.map((aBuddy) => (aBuddy._id === aBuddyId ? updatedABuddyData : aBuddy))
				);
			} catch (error) {
				console.error('Failed to update aBuddy:', error);
			}
		}
	};

	const deleteABuddy = async (aBuddyId) => {
		if (userId && profileId) {
			try {
				await deleteABuddyAPI(userId, profileId, aBuddyId);
				setABuddies((prevABuddies) => prevABuddies.filter((aBuddy) => aBuddy._id !== aBuddyId));
			} catch (error) {
				console.error('Failed to delete aBuddy:', error);
			}
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				userId,
				profileId,
				setProfileId,
				profiles,
				setProfiles,
				getProfile,
				updateProfile,
				deleteProfile,
				createProfile,
				doctors,
				createDoctor,
				getDoctor,
				updateDoctor,
				deleteDoctor,
				abuddies,
				createABuddy,
				getABuddy,
				updateABuddy,
				deleteABuddy,
			}}
		>
			<MedicationProvider userId={userId} profileId={profileId}>
				{children}
			</MedicationProvider>
		</ProfileContext.Provider>
	);
});
