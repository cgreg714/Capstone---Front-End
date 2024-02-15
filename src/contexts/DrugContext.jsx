import React, { createContext, useState, useEffect } from 'react';
import { getAllDrugs } from '../api/drugAPI';

export const DrugContext = createContext();

export const DrugProvider = ({ children }) => {
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const allDrugs = await getAllDrugs();
                setDrugs(allDrugs);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDrugs();
    }, []);

    return (
        <DrugContext.Provider value={{ drugs }}>
            {children}
        </DrugContext.Provider>
    );
};