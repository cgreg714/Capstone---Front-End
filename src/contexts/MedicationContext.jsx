import React, { createContext, useState, useEffect } from 'react';
import {
    getAllMedications as getAllMedicationsAPI,
    createMedication as createMedicationAPI,
    deleteAllMedications as deleteAllMedicationsAPI,
    getMedication as getMedicationAPI,
    updateMedication as updateMedicationAPI,
    deleteMedication as deleteMedicationAPI,
    getByPrescriber as getByPrescriberAPI,
    getByName as getByNameAPI,
    getByDate as getByDateAPI,
    // addDrugToMedication as addDrugToMedicationAPI,
    // removeDrugFromMedication as removeDrugFromMedicationAPI,
    toggleField as toggleFieldAPI,
} from '../api/medicationAPI';
import { getAllIntakes as getAllIntakesAPI,
	deleteAllIntakes as deleteAllIntakesAPI,
	createIntake as createIntakeAPI,
	getIntake as getIntakeAPI,
	updateIntake as updateIntakeAPI,
	deleteIntake as deleteIntakeAPI,
} from '../api/medicationIntakeAPI';

export const MedicationContext = createContext();

export const MedicationProvider = React.memo(({ children, userId, profileId }) => {
	const [medications, setMedications] = useState([]);
	const [intakes, setIntakes] = useState([]);

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

	const getMedication = async (medId) => {
		if (userId && profileId) {
			try {
				const medicationData = await getMedicationAPI(userId, profileId, medId);
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

    // const addDrugToMedication = async (medId, drugId) => {
    //     if (userId && profileId) {
    //         try {
    //             const updatedMedication = await addDrugToMedicationAPI(userId, profileId, medId, drugId);
    //             setMedications((prevMedications) => prevMedications.map((medication) => medication._id === medId ? updatedMedication : medication));
    //         } catch (error) {
    //             console.error('Failed to add drug to medication:', error);
    //         }
    //     }
    // };

    // const removeDrugFromMedication = async (medId, drugId) => {
    //     if (userId && profileId) {
    //         try {
    //             const updatedMedication = await removeDrugFromMedicationAPI(userId, profileId, medId, drugId);
    //             setMedications((prevMedications) => prevMedications.map((medication) => medication._id === medId ? updatedMedication : medication));
    //         } catch (error) {
    //             console.error('Failed to remove drug from medication:', error);
    //         }
    //     }
    // };

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

	const getAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				const data = await getAllIntakesAPI(userId, profileId, medId);
				setIntakes(data);
			} catch (error) {
				console.error('Failed to fetch intakes:', error);
			}
		}
	};

	const deleteAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				await deleteAllIntakesAPI(userId, profileId, medId);
				setIntakes([]);
			} catch (error) {
				console.error('Failed to delete all intakes:', error);
			}
		}
	};

	const createIntake = async (medId, intake) => {
		if (userId && profileId) {
			try {
				const newIntake = await createIntakeAPI(userId, profileId, medId, intake);
				setIntakes((prevIntakes) => [...prevIntakes, newIntake]);
			} catch (error) {
				console.error('Failed to create intake:', error);
			}
		}
	};

	const getIntake = async (medId, intakeId) => {
		if (userId && profileId) {
			try {
				const intakeData = await getIntakeAPI(userId, profileId, medId, intakeId);
				setIntakes((prevIntakes) =>
					prevIntakes.map((intake) => (intake._id === intakeId ? intakeData : intake))
				);
			} catch (error) {
				console.error('Failed to fetch intake:', error);
			}
		}
	};

	const updateIntake = async (medId, intakeId, updatedIntake) => {
		if (userId && profileId) {
			try {
				const updatedIntakeData = await updateIntakeAPI(userId, profileId, medId, intakeId, updatedIntake);
				setIntakes((prevIntakes) =>
					prevIntakes.map((intake) => (intake._id === intakeId ? updatedIntakeData : intake))
				);
			} catch (error) {
				console.error('Failed to update intake:', error);
			}
		}
	};

	const deleteIntake = async (medId, intakeId) => {
		if (userId && profileId) {
			try {
				await deleteIntakeAPI(userId, profileId, medId, intakeId);
				setIntakes((prevIntakes) => prevIntakes.filter((intake) => intake._id !== intakeId));
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
				deleteAllMedications,
				getMedication,
				updateMedication,
				deleteMedication,
                getByPrescriber,
                getByName,
                getByDate,
                // addDrugToMedication,
                // removeDrugFromMedication,
                toggleField,
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
});
