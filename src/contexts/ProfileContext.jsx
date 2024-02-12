import React, { createContext, useState, useEffect } from 'react';
import { getAllProfiles, createProfile, getProfile, updateProfile, deleteProfile } from '../api/profileAPI';
import {
	getAllMedications,
	createMedication,
	getMedicationById,
	updateMedication,
	deleteMedication,
} from '../api/medicationAPI';
import { getAllABuddies, createABuddy, getOneABuddy, updateABuddy, deleteABuddy } from '../api/aBuddyAPI';
import { getAllDoctors, createDoctor, getOneDoctor, updateDoctor, deleteDoctor } from '../api/doctorAPI';
import {
	getAllDrugs,
	getSpecificDrugInteractionByDrugbankId,
	getDrugByDrugbankId,
	getDrugByUnii,
	searchDrugs,
} from '../api/drugAPI';
import { getAllIntakes, createIntake, getIntake, updateIntake, deleteIntake } from '../api/medicationIntakeAPI';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children, userId }) => {
	const [profiles, setProfiles] = useState([]);
	const [medications, setMedications] = useState([]);
	const [aBuddies, setABuddies] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [drugs, setDrugs] = useState([]);
	const [intakes, setIntakes] = useState([]);

	const [profileId, setProfileId] = useState(null);

	useEffect(() => {
		if (!userId) {
			return; // Don't run the effect if userId is undefined
		}
		console.log('🚀 ~ file: ProfileContext.jsx:53 ~ ProfileProvider ~ userId:', userId);
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

	const addProfile = async (profile) => {
		if (userId) {
			try {
				const newProfile = await createProfile(userId, profile);
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
				addProfile,
				medications,
				setMedications,
				aBuddies,
				setABuddies,
				doctors,
				setDoctors,
				drugs,
				setDrugs,
				intakes,
				setIntakes,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};
