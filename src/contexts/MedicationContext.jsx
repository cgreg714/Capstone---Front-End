import { createContext, useState, useEffect } from 'react';
import {
	getAllMedications as getAllMedicationsAPI,
	createMedication as createMedicationAPI,
	getMedication as getMedicationAPI,
	updateMedication as updateMedicationAPI,
	deleteMedication as deleteMedicationAPI,
	toggleField as toggleFieldAPI,
	addDrugToMedication as addDrugAPI,
	removeDrugFromMedication as removeDrugAPI,
} from '../api/medicationAPI';
import {
	getAllIntakes as getAllIntakesAPI,
	deleteAllIntakes as deleteAllIntakesAPI,
	createIntake as createIntakeAPI,
	getIntake as getIntakeAPI,
	updateIntake as updateIntakeAPI,
	deleteIntake as deleteIntakeAPI,
} from '../api/medicationIntakeAPI';

export const MedicationContext = createContext();

export const MedicationProvider = ({ children, userId, profileId }) => {
	console.log("🚀 ~ file: MedicationContext.jsx:24 ~ MedicationProvider ~ profileId:", profileId)
	console.log("🚀 ~ file: MedicationContext.jsx:24 ~ MedicationProvider ~ userId:", userId)
	const [medications, setMedications] = useState([]);

	useEffect(() => {
		if (!userId || !profileId) {
			return;
		}

		const getAllMedications = async () => {
			try {
				const data = await getAllMedicationsAPI(userId, profileId);
				setMedications(data);
			} catch (error) {
				console.error('Failed to fetch medications:', error);
			}
		};

		getAllMedications();
	}, [userId, profileId]);

	const createMedication = async (medication) => {
		if (userId && profileId) {
			try {
				const newMedication = await createMedicationAPI(userId, profileId, medication);
				setMedications((prevMedications) => [...prevMedications, newMedication]);
			} catch (error) {
				console.error('Failed to create medication:', error);
			}
		}
	};

	const getMedication = async (medId) => {
		if (userId && profileId) {
			try {
				const medication = await getMedicationAPI(userId, profileId, medId);
				return medication;
			} catch (error) {
				console.error('Failed to fetch medication:', error);
			}
		}
	};

	const updateMedication = async (medId, updatedMedication) => {
		if (userId && profileId) {
			try {
				const updatedMed = await updateMedicationAPI(userId, profileId, medId, updatedMedication);
				setMedications((prevMedications) =>
					prevMedications.map((med) => (med.id === medId ? updatedMed : med))
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
				setMedications((prevMedications) => prevMedications.filter((med) => med.id !== medId));
			} catch (error) {
				console.error('Failed to delete medication:', error);
			}
		}
	};

	const toggleField = async (medId, field) => {
		if (userId && profileId) {
			try {
				const updatedMedication = await toggleFieldAPI(userId, profileId, medId, field);
				setMedications((prevMedications) =>
					prevMedications.map((med) => (med.id === medId ? updatedMedication : med))
				);
			} catch (error) {
				console.error('Failed to toggle field:', error);
			}
		}
	};

	const addDrugToMedication = async (medId, drugId) => {
		if (userId && profileId) {
			try {
				const updatedMedication = await addDrugAPI(userId, profileId, medId, drugId);
				setMedications((prevMedications) =>
					prevMedications.map((med) => (med.id === medId ? updatedMedication : med))
				);
			} catch (error) {
				console.error('Failed to add drug:', error);
			}
		}
	};

	const removeDrugFromMedication = async (medId, drugId) => {
		if (userId && profileId) {
			try {
				const updatedMedication = await removeDrugAPI(userId, profileId, medId, drugId);
				setMedications((prevMedications) =>
					prevMedications.map((med) => (med.id === medId ? updatedMedication : med))
				);
			} catch (error) {
				console.error('Failed to remove drug:', error);
			}
		}
	};

	// Medication Intakes
	const [intakes, setIntakes] = useState([]);

	const getAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				const intakes = await getAllIntakesAPI(userId, profileId, medId);
				return intakes;
			} catch (error) {
				console.error('Failed to fetch intakes:', error);
			}
		}
	};

	const deleteAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				await deleteAllIntakesAPI(userId, profileId, medId);
			} catch (error) {
				console.error('Failed to delete all intakes:', error);
			}
		}
	};

	const createIntake = async (medId, intake) => {
		if (userId && profileId) {
			try {
				const newIntake = await createIntakeAPI(userId, profileId, medId, intake);
				return newIntake;
			} catch (error) {
				console.error('Failed to create intake:', error);
			}
		}
	};

	const getIntake = async (medId, intakeId) => {
		if (userId && profileId) {
			try {
				const intake = await getIntakeAPI(userId, profileId, medId, intakeId);
				return intake;
			} catch (error) {
				console.error('Failed to fetch intake:', error);
			}
		}
	};

	const updateIntake = async (medId, intakeId, updatedIntake) => {
		if (userId && profileId) {
			try {
				const updated = await updateIntakeAPI(userId, profileId, medId, intakeId, updatedIntake);
				return updated;
			} catch (error) {
				console.error('Failed to update intake:', error);
			}
		}
	};

	const deleteIntake = async (medId, intakeId) => {
		if (userId && profileId) {
			try {
				await deleteIntakeAPI(userId, profileId, medId, intakeId);
			} catch (error) {
				console.error('Failed to delete intake:', error);
			}
		}
	};

	return (
		<MedicationContext.Provider
			value={{
				medications,
				createMedication,
				getMedication,
				updateMedication,
				deleteMedication,
				toggleField,
				addDrugToMedication,
				removeDrugFromMedication,
				intakes,
				getAllIntakes,
				deleteAllIntakes,
				createIntake,
				getIntake,
				updateIntake,
				deleteIntake,
			}}
		>
			{children}
		</MedicationContext.Provider>
	);
};
