import React from 'react';
import { useTheme } from '@mui/material/styles';
import './LoadingBar.css';
import medicineImage from '../assets/medicine130x130.png';

const LoadingBar = () => {
    const theme = useTheme();

    return (
        <div className="loading-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={medicineImage} alt="Loading..." className="loading-image" />
            <div className="loading-text" style={{ color: theme.palette.text.primary }}>Fetching drugs from database</div>
        </div>
    );
};

export default LoadingBar;