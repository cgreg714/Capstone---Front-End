import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllDrugs } from '../api/drugAPI';
import { SnackbarContext } from '../contexts/SnackbarContext';

export const DrugContext = createContext();

export const DrugProvider = ({ children }) => {
    const [drugs, setDrugs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const allDrugs = await getAllDrugs();
                setDrugs(allDrugs);
            } catch (error) {
                setSnackbarMessage('An error occurred while fetching drugs');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDrugs();
    }, [setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]);

    return (
        <DrugContext.Provider value={{ drugs, isLoading }}>
            {children}
        </DrugContext.Provider>
    );
};