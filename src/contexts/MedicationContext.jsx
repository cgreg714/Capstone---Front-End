import React, { createContext, useState, useEffect } from 'react';
import {
    getAllMedications as getAllMedicationsAPI,
    createMedication as createMedicationAPI,
    deleteAllMedications as deleteAllMedicationsAPI,
    getMedicationById as getMedicationByIdAPI,
    updateMedication as updateMedicationAPI,
    deleteMedication as deleteMedicationAPI,
    getByPrescriber as getByPrescriberAPI,
    getByName as getByNameAPI,
    getByDate as getByDateAPI,
    addDrugToMedication as addDrugToMedicationAPI,
    removeDrugFromMedication as removeDrugFromMedicationAPI,
    toggleField as toggleFieldAPI,
} from '../api/medicationAPI';

export const MedicationContext = createContext();

export const MedicationProvider = React.memo(({ children, userId, profileId }) => {
	const [medications, setMedications] = useState([]);
	console.log("🚀 ~ file: MedicationContext.jsx:23 ~ MedicationProvider ~ medications:", medications)

	useEffect(() => {
		if (!userId || !profileId) {
			return;
		}

		const fetchMedications = async () => {
			try {
				const data = await getAllMedicationsAPI(userId, profileId);
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
				const newMedication = await createMedicationAPI(userId, profileId, medication);
				setMedications((prevMedications) => [...prevMedications, newMedication]);
			} catch (error) {
				console.error('Failed to create medication:', error);
			}
		}
	};

	const deleteAllMedications = async () => {
		if (userId && profileId) {
			try {
				await deleteAllMedicationsAPI(userId, profileId);
				setMedications([]);
			} catch (error) {
				console.error('Failed to delete all medications:', error);
			}
		}
	};

	const getMedicationById = async (medId) => {
		if (userId && profileId) {
			try {
				const medicationData = await getMedicationByIdAPI(userId, profileId, medId);
				setMedications((prevMedications) =>
					prevMedications.map((medication) => (medication._id === medId ? medicationData : medication))
				);
			} catch (error) {
				console.error('Failed to fetch medication:', error);
			}
		}
	};

	const updateMedication = async (medId, updatedMedication) => {
		if (userId && profileId) {
			try {
				const updatedMedicationData = await updateMedicationAPI(userId, profileId, medId, updatedMedication);
				setMedications((prevMedications) =>
					prevMedications.map((medication) => (medication._id === medId ? updatedMedicationData : medication))
				);
			} catch (error) {
				console.error('Failed to update medication:', error);
			}
		}
	};

	const deleteMedication = async (medId) => {
		if (userId && profileId) {
			try {
				await deleteMedicationAPI(userId, profileId, medId);
				setMedications((prevMedications) => prevMedications.filter((medication) => medication._id !== medId));
			} catch (error) {
				console.error('Failed to delete medication:', error);
			}
		}
	};

    const getByPrescriber = async (prescriber) => {
        if (userId && profileId) {
            try {
                const data = await getByPrescriberAPI(userId, profileId, prescriber);
                setMedications(data);
            } catch (error) {
                console.error('Failed to fetch medications by prescriber:', error);
            }
        }
    };

    const getByName = async (name) => {
        if (userId && profileId) {
            try {
                const data = await getByNameAPI(userId, profileId, name);
                setMedications(data);
            } catch (error) {
                console.error('Failed to fetch medications by name:', error);
            }
        }
    };

    const getByDate = async (dateAdded) => {
        if (userId && profileId) {
            try {
                const data = await getByDateAPI(userId, profileId, dateAdded);
                setMedications(data);
            } catch (error) {
                console.error('Failed to fetch medications by date:', error);
            }
        }
    };

    const addDrugToMedication = async (medId, drugId) => {
        if (userId && profileId) {
            try {
                const updatedMedication = await addDrugToMedicationAPI(userId, profileId, medId, drugId);
                setMedications((prevMedications) => prevMedications.map((medication) => medication._id === medId ? updatedMedication : medication));
            } catch (error) {
                console.error('Failed to add drug to medication:', error);
            }
        }
    };

    const removeDrugFromMedication = async (medId, drugId) => {
        if (userId && profileId) {
            try {
                const updatedMedication = await removeDrugFromMedicationAPI(userId, profileId, medId, drugId);
                setMedications((prevMedications) => prevMedications.map((medication) => medication._id === medId ? updatedMedication : medication));
            } catch (error) {
                console.error('Failed to remove drug from medication:', error);
            }
        }
    };

    const toggleField = async (medId, field) => {
        if (userId && profileId) {
            try {
                const updatedMedication = await toggleFieldAPI(userId, profileId, medId, field);
                setMedications((prevMedications) => prevMedications.map((medication) => medication._id === medId ? updatedMedication : medication));
            } catch (error) {
                console.error('Failed to toggle field:', error);
            }
        }
    };

	return (
		<MedicationContext.Provider
			value={{
				medications,
				addMedication,
				deleteAllMedications,
				getMedicationById,
				updateMedication,
				deleteMedication,
                getByPrescriber,
                getByName,
                getByDate,
                addDrugToMedication,
                removeDrugFromMedication,
                toggleField,
			}}
		>
			{children}
		</MedicationContext.Provider>
	);
});
