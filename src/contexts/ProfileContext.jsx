import React, { createContext, useState, useEffect } from 'react';
import { MedicationProvider } from './MedicationContext';
import { getAllProfiles, createProfile as createProfileAPI } from '../api/profileAPI';
// import { getAllProfiles, createProfile, getProfile, updateProfile, deleteProfile } from '../api/profileAPI';
// import {
// 	getAllMedications,
// 	createMedication,
// 	getMedicationById,
// 	updateMedication,
// 	deleteMedication,
// } from '../api/medicationAPI';
// import { getAllABuddies, createABuddy, getOneABuddy, updateABuddy, deleteABuddy } from '../api/aBuddyAPI';
// import { getAllDoctors, createDoctor, getOneDoctor, updateDoctor, deleteDoctor } from '../api/doctorAPI';
// import {
// 	getAllDrugs,
// 	getSpecificDrugInteractionByDrugbankId,
// 	getDrugByDrugbankId,
// 	getDrugByUnii,
// 	searchDrugs,
// } from '../api/drugAPI';
// import { getAllIntakes, createIntake, getIntake, updateIntake, deleteIntake } from '../api/medicationIntakeAPI';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children, userId }) => {
	const [profiles, setProfiles] = useState([]);
	const [aBuddies, setABuddies] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [drugs, setDrugs] = useState([]);

	const [profileId, setProfileId] = useState(null);

	useEffect(() => {
		console.log('🚀 ~ file: ProfileContext.jsx:34 ~ userId changed:', userId);
		if (!userId) {
			return;
		}
		const fetchProfiles = async () => {
			try {
				const data = await getAllProfiles(userId);
				setProfiles(data);
			} catch (error) {
				console.error('Failed to fetch profiles:', error);
			}
		};

		fetchProfiles();
	}, [userId]);

	// Do the same for medications, aBuddies, doctors, drugs, and intakes

	const createProfile = async (profile) => {
		console.log('🚀 ~ file: ProfileContext.jsx:53 ~ createProfile ~ profile:', profile);
		console.log('🚀 ~ file: ProfileContext.jsx:55 ~ createProfile ~ userId:', userId);
		if (!userId) {
			console.error('Cannot create profile: userId is undefined');
			return;
		}
		if (userId) {
			try {
				const newProfile = await createProfileAPI(userId, profile);
				setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
			} catch (error) {
				console.error('Failed to create profile:', error);
			}
		}
	};

	// Do the same for updating and deleting profiles

	return (
		<ProfileContext.Provider
			value={{
				userId,
				profileId,
				setProfileId,
				profiles,
				setProfiles,
				createProfile,
				aBuddies,
				setABuddies,
				doctors,
				setDoctors,
				drugs,
				setDrugs,
			}}
		>
			<MedicationProvider userId={userId} profileId={profileId}>
				{children}
			</MedicationProvider>
		</ProfileContext.Provider>
	);
};
