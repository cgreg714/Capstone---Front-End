import React, { createContext, useState, useEffect } from 'react';
import { getAllProfiles, createProfile, getProfile, updateProfile, deleteProfile } from '../api/profileAPI';
import { getAllMedications, createMedication, getMedicationById, updateMedication, deleteMedication } from '../api/medicationAPI';
import { getAllABuddies, createABuddy, getOneABuddy, updateABuddy, deleteABuddy } from '../api/aBuddyAPI';
import { getAllDoctors, createDoctor, getOneDoctor, updateDoctor, deleteDoctor } from '../api/doctorAPI';
import { getAllDrugs, getSpecificDrugInteractionByDrugbankId, getDrugByDrugbankId, getDrugByUnii, searchDrugs } from '../api/drugAPI';
import { getAllIntakes, createIntake, getIntake, updateIntake, deleteIntake } from '../api/medicationIntakeAPI';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [medications, setMedications] = useState([]);
    const [aBuddies, setABuddies] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [intakes, setIntakes] = useState([]);

    const [theme, setTheme] = useState(localStorage.getItem('profileTheme') || 'light');

    useEffect(() => {
        if (profiles.length > 0) {
            profiles.forEach(profile => {
                localStorage.setItem(`profileTheme${profile.id}`, theme);
            });
        }
    }, [profiles, theme]);



    return (
        <ProfileContext.Provider value={{ theme, setTheme, profiles, setProfiles, medications, setMedications, aBuddies, setABuddies, doctors, setDoctors, drugs, setDrugs, intakes, setIntakes }}>
            {children}
        </ProfileContext.Provider>
    );
};