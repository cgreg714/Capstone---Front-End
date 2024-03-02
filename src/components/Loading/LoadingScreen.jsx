import React from 'react';
import { useTheme } from '@mui/material/styles';
import './LoadingBar.css';
import medicineImage from '../../assets/medicine130x130.png';

const LoadingScreen = () => {
    const theme = useTheme();

    return (
        <div className="loading-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={medicineImage} alt="Loading..." className="loading-image" />
            <div className="loading-text" style={{ color: theme.palette.text.primary }}>LOADING APP</div>
        </div>
    );
};

export default LoadingScreen;