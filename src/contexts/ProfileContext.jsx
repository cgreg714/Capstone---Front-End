import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import LoadingBar from '../components/Loading/LoadingBar';
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
import {
	getAllPharmacies as getAllPharmaciesAPI,
	createPharmacy as createPharmacyAPI,
	getOnePharmacy as getOnePharmacyAPI,
	updatePharmacy as updatePharmacyAPI,
	deletePharmacy as deletePharmacyAPI,
} from '../api/pharmacyAPI';
import {
	getAllNotifications as getAllNotificationsAPI,
	createNotification as createNotificationAPI,
	getNotification as getNotificationAPI,
	updateNotification as updateNotificationAPI,
	deleteNotification as deleteNotificationAPI,
	deleteAllNotifications as deleteAllNotificationsAPI,
} from '../api/notificationAPI';
import { SnackbarContext } from '../contexts/SnackbarContext';

export const ProfileContext = createContext();

export const ProfileProvider = React.memo(({ children, userId }) => {
	const initialProfileId = localStorage.getItem('profileId');
	const [profiles, setProfiles] = useState([]);
	const [profileId, setProfileId] = useState(initialProfileId || null);

	const [doctors, setDoctors] = useState([]);
	const [abuddies, setABuddies] = useState([]);
	const [pharmacies, setPharmacies] = useState([]);

	const [avatarUrl, setAvatarUrl] = useState(null);
	const [notifications, setNotifications] = useState([]);

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
					setSnackbarMessage('Failed to fetch profile.');
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
				}
			}
		},
		[userId, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, setAvatarUrl, setProfileId]
	);

	const getAllNotifications = useCallback(async () => {
		try {
			const notificationsData = await getAllNotificationsAPI(userId, profileId);
			setNotifications(notificationsData);
		} catch (error) {
			setSnackbarMessage('Failed to fetch notifications.');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	}, [userId, profileId, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

	useEffect(() => {
		if (!userId) {
			return;
		}

		const fetchProfiles = async () => {
			setIsLoading(true);
			try {
				const profilesData = await getAllProfilesAPI(userId);
				setProfiles(profilesData);
			} catch (error) {
				setSnackbarMessage('Failed to fetch profiles.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
			setIsLoading(false);
		};

		fetchProfiles();

		if (!profileId) {
			return;
		}

		const getAllDoctors = async () => {
			try {
				const doctorsData = await getAllDoctorsAPI(userId, profileId);
				setDoctors(doctorsData);
			} catch (error) {
				setSnackbarMessage('Failed to fetch doctors.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		};

		const getAllABuddies = async () => {
			try {
				const abuddiesData = await getAllABuddiesAPI(userId, profileId);
				setABuddies(abuddiesData);
			} catch (error) {
				setSnackbarMessage('Failed to fetch buddies.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		};

		const getAllPharmacies = async () => {
			try {
				const pharmaciesData = await getAllPharmaciesAPI(userId, profileId);
				setPharmacies(pharmaciesData);
			} catch (error) {
				setSnackbarMessage('Failed to fetch pharmacies.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		};

		getAllPharmacies();
		getAllABuddies();
		getAllDoctors();
		getAllNotifications();
		getProfile(profileId);
	}, [userId, profileId, getProfile, getAllNotifications, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

	const createProfile = async (profile) => {
		if (userId) {
			try {
				const newProfile = await createProfileAPI(userId, profile);
				setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
				setProfileId(newProfile._id);
				localStorage.setItem('profileId', newProfile._id);
			} catch (error) {
				setSnackbarMessage('Failed to create profile.');
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
				setSnackbarMessage('Failed to update profile.');
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
				setSnackbarMessage('Successfully deleted profile.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete profile.');
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
				setSnackbarMessage('Failed to create doctor.');
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
				setSnackbarMessage('Failed to fetch doctor.');
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
				setSnackbarMessage('Successfully updated doctor.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to update doctor.');
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
				setSnackbarMessage('Successfully deleted doctor.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete doctor.');
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
				setSnackbarMessage('Failed to create buddy.');
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
				setSnackbarMessage('Failed to fetch buddy.');
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
				setSnackbarMessage('Successfully updated buddy.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to update buddy.');
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
				setSnackbarMessage('Successfully deleted buddy.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete buddy.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const createNotification = useCallback(
		async (notification) => {
			if (userId && profileId) {
				try {
					const newNotification = await createNotificationAPI(userId, profileId, notification);
					setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
				} catch (error) {
					setSnackbarMessage('Failed to create notification.');
					setSnackbarSeverity('error');
					setOpenSnackbar(true);
				}
			}
		},
		[setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, setNotifications, userId, profileId]
	);

	const getNotification = async (notificationId) => {
		if (userId && profileId) {
			try {
				const notificationData = await getNotificationAPI(userId, profileId, notificationId);
				setNotifications((prevNotifications) =>
					prevNotifications.map((notification) =>
						notification.id === notificationId ? notificationData : notification
					)
				);
			} catch (error) {
				setSnackbarMessage('Failed to fetch notification.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const updateNotification = async (notificationId, updatedNotification) => {
		if (userId && profileId) {
			try {
				const updatedNotificationData = await updateNotificationAPI(
					userId,
					profileId,
					notificationId,
					updatedNotification
				);
				setNotifications((prevNotifications) =>
					prevNotifications.map((notification) =>
						notification.id === notificationId ? updatedNotificationData : notification
					)
				);
			} catch (error) {
				setSnackbarMessage('Failed to update notification.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteNotification = async (notificationId) => {
		if (userId && profileId) {
			try {
				await deleteNotificationAPI(userId, profileId, notificationId);
				setNotifications((prevNotifications) =>
					prevNotifications.filter((notification) => notification._id !== notificationId)
				);
				setSnackbarMessage('Successfully deleted notification.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete notification.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteAllNotifications = async () => {
		if (userId && profileId) {
			try {
				await deleteAllNotificationsAPI(userId, profileId);
				setNotifications([]);
				setSnackbarMessage('Successfully deleted all notifications.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete all notifications.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const createPharmacy = async (pharmacy) => {
		if (userId && profileId) {
			try {
				const newPharmacy = await createPharmacyAPI(userId, profileId, pharmacy);
				setPharmacies((prevPharmacies) => [...prevPharmacies, newPharmacy]);
			} catch (error) {
				setSnackbarMessage('Failed to create pharmacy.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const getPharmacy = async (pharmacyId) => {
		if (userId && profileId) {
			try {
				const pharmacyData = await getOnePharmacyAPI(userId, profileId, pharmacyId);
				setPharmacies((prevPharmacies) =>
					prevPharmacies.map((pharmacy) => (pharmacy._id === pharmacyId ? pharmacyData : pharmacy))
				);
			} catch (error) {
				setSnackbarMessage('Failed to fetch pharmacy');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const updatePharmacy = async (pharmacyId, updatedPharmacy) => {
		if (userId && profileId) {
			try {
				const updatedPharmacyData = await updatePharmacyAPI(userId, profileId, pharmacyId, updatedPharmacy);
				setPharmacies((prevPharmacies) =>
					prevPharmacies.map((pharmacy) => (pharmacy._id === pharmacyId ? updatedPharmacyData : pharmacy))
				);
				setSnackbarMessage('Successfully updated pharmacy.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to update pharmacy.');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deletePharmacy = async (pharmacyId) => {
		if (userId && profileId) {
			try {
				await deletePharmacyAPI(userId, profileId, pharmacyId);
				setPharmacies((prevPharmacies) => prevPharmacies.filter((pharmacy) => pharmacy._id !== pharmacyId));
				setSnackbarMessage('Successfully deleted pharmacy.');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (error) {
				setSnackbarMessage('Failed to delete pharmacy.');
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
				pharmacies,
				createPharmacy,
				getPharmacy,
				updatePharmacy,
				deletePharmacy,
				isLoading,
				notifications,
				getAllNotifications,
				createNotification,
				getNotification,
				updateNotification,
				deleteNotification,
				deleteAllNotifications,
			}}
		>
			{isLoading ? (
				<LoadingBar />
			) : (
				<MedicationProvider userId={userId} profileId={profileId}>
					{children}
				</MedicationProvider>
			)}
		</ProfileContext.Provider>
	);
});
