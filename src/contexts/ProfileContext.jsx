import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
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
import { SnackbarContext } from '../contexts/SnackbarContext';

export const ProfileContext = createContext();

export const ProfileProvider = React.memo(({ children, userId }) => {
	const initialProfileId = localStorage.getItem('profileId');
	const [profiles, setProfiles] = useState([]);
	const [profileId, setProfileId] = useState(initialProfileId || null);

	const [doctors, setDoctors] = useState([]);
	const [abuddies, setABuddies] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const getProfile = useCallback(
		async (profileId) => {
			if (userId) {
				try {
					const profileData = await getProfileAPI(userId, profileId);
					setProfileId(profileData._id);
					setAvatarUrl(profileData.avatar);
				} catch (error) {
					setSnackbarMessage('Failed to fetch profile');
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
				}
			}
		},
		[userId, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, setAvatarUrl, setProfileId]
	);

	useEffect(() => {
		if (!userId) {
			return;
		}

		const fetchProfiles = async () => {
			setIsLoading(true);
			try {
				const data = await getAllProfilesAPI(userId);
				setProfiles(data);
			} catch (error) {
				setSnackbarMessage('Failed to fetch profiles');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
			setIsLoading(false);
		};

		fetchProfiles();

		if (!profileId) {
			return;
		}

		getProfile(profileId);

		const fetchDoctors = async () => {
			try {
				const data = await getAllDoctorsAPI(userId, profileId);
				setDoctors(data);
			} catch (error) {
				setSnackbarMessage('Failed to fetch doctors');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		};

		const fetchABuddies = async () => {
			try {
				const data = await getAllABuddiesAPI(userId, profileId);
				setABuddies(data);
			} catch (error) {
				setSnackbarMessage('Failed to fetch abuddies');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		};

		fetchABuddies();
		fetchDoctors();
	}, [userId, profileId, getProfile, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

	const createProfile = async (profile) => {
		if (userId) {
			try {
				const newProfile = await createProfileAPI(userId, profile);
				setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
				setProfileId(newProfile._id);
				localStorage.setItem('profileId', newProfile._id);
			} catch (error) {
				setSnackbarMessage('Failed to create profile');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('Failed to update profile');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteProfile = async (profileId) => {
		if (userId) {
			try {
				await deleteProfileAPI(userId, profileId);
				setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== profileId));
			} catch (error) {
				setSnackbarMessage('Failed to delete profile');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const createDoctor = async (doctor) => {
		if (userId && profileId) {
			try {
				const newDoctor = await createDoctorAPI(userId, profileId, doctor);
				setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
			} catch (error) {
				setSnackbarMessage('Failed to create doctor');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('Failed to fetch doctor');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('Failed to update doctor');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteDoctor = async (doctorId) => {
		if (userId && profileId) {
			try {
				await deleteDoctorAPI(userId, profileId, doctorId);
				setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
			} catch (error) {
				setSnackbarMessage('Failed to delete doctor');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const createABuddy = async (aBuddy) => {
		if (userId && profileId) {
			try {
				const newABuddy = await createABuddyAPI(userId, profileId, aBuddy);
				setABuddies((prevABuddies) => [...prevABuddies, newABuddy]);
			} catch (error) {
				setSnackbarMessage('Failed to create abuddy');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('Failed to fetch abuddy');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('Failed to update abuddy');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteABuddy = async (aBuddyId) => {
		if (userId && profileId) {
			try {
				await deleteABuddyAPI(userId, profileId, aBuddyId);
				setABuddies((prevABuddies) => prevABuddies.filter((aBuddy) => aBuddy._id !== aBuddyId));
			} catch (error) {
				setSnackbarMessage('Failed to delete abuddy');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				userId,
				profileId,
				avatarUrl,
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
				isLoading,
			}}
		>
			<MedicationProvider userId={userId} profileId={profileId}>
				{children}
			</MedicationProvider>
		</ProfileContext.Provider>
	);
});
