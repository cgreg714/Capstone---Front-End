import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
	getAllMedications as getAllMedicationsAPI,
	createMedication as createMedicationAPI,
	deleteAllMedications as deleteAllMedicationsAPI,
	getMedication as getMedicationAPI,
	updateMedication as updateMedicationAPI,
	deleteMedication as deleteMedicationAPI,
	// addDrugToMedication as addDrugToMedicationAPI,
	toggleField as toggleFieldAPI,
	addQuantity as addQuantityAPI,
} from '../api/medicationAPI';
import {
	getAllIntakes as getAllIntakesAPI,
	deleteAllIntakes as deleteAllIntakesAPI,
	createIntake as createIntakeAPI,
	getIntake as getIntakeAPI,
	updateIntake as updateIntakeAPI,
	deleteIntake as deleteIntakeAPI,
} from '../api/medicationIntakeAPI';
import { SnackbarContext } from '../contexts/SnackbarContext';

export const MedicationContext = createContext();

export const MedicationProvider = React.memo(({ children, userId, profileId }) => {
	const [medications, setMedications] = useState([]);
	const [intakes, setIntakes] = useState([]);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

	const getAllMedications = useCallback(async () => {
		if (!userId || !profileId) {
			return;
		}

		try {
			const data = await getAllMedicationsAPI(userId, profileId);
			setMedications(data);
		} catch (error) {
			setSnackbarMessage('An error occurred while fetching medications');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	}, [userId, profileId, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

	useEffect(() => {
		getAllMedications();
	}, [getAllMedications]);

	const createMedication = async (medication) => {
		if (userId && profileId) {
			try {
				const newMedication = await createMedicationAPI(userId, profileId, medication);
				setMedications((prevMedications) => [...prevMedications, newMedication]);
			} catch (error) {
				setSnackbarMessage('An error occurred while creating a medication');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteAllMedications = async () => {
		if (userId && profileId) {
			try {
				await deleteAllMedicationsAPI(userId, profileId);
				setMedications([]);
			} catch (error) {
				setSnackbarMessage('An error occurred while deleting all medications');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('An error occurred while fetching a medication');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const updateMedication = async (medId, updatedMedication) => {
		if (userId && profileId) {
			try {
				const updatedMedicationData = await updateMedicationAPI(userId, profileId, medId, updatedMedication);
				setMedications((prevMedications) =>
					prevMedications.map((medication) =>
						medication._id === medId
							? { ...updatedMedicationData, quantity: updatedMedication.quantity }
							: medication
					)
				);
			} catch (error) {
				setSnackbarMessage('An error occurred while updating a medication');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteMedication = async (medId) => {
		if (userId && profileId) {
			try {
				await deleteMedicationAPI(userId, profileId, medId);
				setMedications((prevMedications) => prevMedications.filter((medication) => medication._id !== medId));
			} catch (error) {
				setSnackbarMessage('An error occurred while deleting a medication');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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

	const toggleField = async (medId, field) => {
		if (userId && profileId) {
			try {
				const updatedMedication = await toggleFieldAPI(userId, profileId, medId, field);
				setMedications((prevMedications) =>
					prevMedications.map((medication) => (medication._id === medId ? updatedMedication : medication))
				);
			} catch (error) {
				setSnackbarMessage('An error occurred while toggling the field');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const addQuantity = async (medId, quantity) => {
		if (userId && profileId) {
			try {
				const updatedMedication = await addQuantityAPI(userId, profileId, medId, quantity);
				setMedications((prevMedications) =>
					prevMedications.map((medication) => (medication._id === medId ? updatedMedication : medication))
				);
			} catch (error) {
				setSnackbarMessage('An error occurred while adding quantity');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const getAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				const data = await getAllIntakesAPI(userId, profileId, medId);
				setIntakes(data);
			} catch (error) {
				setSnackbarMessage('An error occurred while fetching intakes');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteAllIntakes = async (medId) => {
		if (userId && profileId) {
			try {
				await deleteAllIntakesAPI(userId, profileId, medId);
				setIntakes([]);
			} catch (error) {
				setSnackbarMessage('An error occurred while deleting all intakes');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const createIntake = async (medId, intake) => {
		if (userId && profileId) {
			try {
				const newIntake = await createIntakeAPI(userId, profileId, medId, intake);
				setMedications((prevMedications) =>
					prevMedications.map((medication) =>
						medication._id === medId
							? { ...medication, medicationIntakes: [...medication.medicationIntakes, newIntake] }
							: medication
					)
				);
			} catch (error) {
				setSnackbarMessage('An error occurred while creating an intake');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('An error occurred while fetching an intake');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
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
				setSnackbarMessage('An error occurred while updating an intake');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	const deleteIntake = async (medId, intakeId) => {
		if (userId && profileId) {
			try {
				await deleteIntakeAPI(userId, profileId, medId, intakeId);
				setMedications((prevMedications) => {
					return prevMedications.map((medication) => {
						if (medication._id === medId) {
							return {
								...medication,
								medicationIntakes: medication.medicationIntakes.filter(
									(intake) => intake._id !== intakeId
								),
							};
						} else {
							return medication;
						}
					});
				});
			} catch (error) {
				setSnackbarMessage('An error occurred while deleting an intake');
				setSnackbarSeverity('error');
				setOpenSnackbar(true);
			}
		}
	};

	return (
		<MedicationContext.Provider
			value={{
				medications,
				createMedication,
				getAllMedications,
				deleteAllMedications,
				getMedication,
				updateMedication,
				deleteMedication,
				// addDrugToMedication,
				toggleField,
				addQuantity,
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
