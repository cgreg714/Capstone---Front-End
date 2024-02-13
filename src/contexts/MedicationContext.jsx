import { createContext, useState, useEffect } from 'react';
import { getAllMedications, createMedication } from '../api/medicationAPI';

export const MedicationContext = createContext();

export const MedicationProvider = ({ children, userId, profileId }) => {
    console.log("🚀 ~ file: MedicationContext.jsx:7 ~ MedicationProvider ~ profileId:", profileId)
    console.log("🚀 ~ file: MedicationContext.jsx:7 ~ MedicationProvider ~ userId:", userId)
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        if (!userId || !profileId) {
            return; // Don't run if userId or profileId is undefined
        }

        const fetchMedications = async () => {
            try {
                const data = await getAllMedications(userId, profileId);
                setMedications(data);
            } catch (error) {
                console.error('Failed to fetch medications:', error);
            }
        };

        fetchMedications();
    }, [userId, profileId]);

    const addMedication = async (medication) => {
        if (userId && profileId) {
            try {
                const newMedication = await createMedication(userId, profileId, medication);
                setMedications((prevMedications) => [...prevMedications, newMedication]);
            } catch (error) {
                console.error('Failed to create medication:', error);
            }
        }
    };

    // Do the same for updating and deleting medications

    return (
        <MedicationContext.Provider
            value={{
                medications,
                addMedication,
                // Include any other functions you need here
            }}
        >
            {children}
        </MedicationContext.Provider>
    );
};