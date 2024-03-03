import React from 'react';
import { useTheme } from '@mui/material/styles';
import './LoadingBar.css';
import medicineImage from '../../assets/medicine130x130.png';

const LoadingScreen = () => {
    const theme = useTheme();

    return (
        <div className="loading-bar" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'fixed', 
            top: 0, 
            bottom: 0, 
            left: 0, 
            right: 0
        }}>
            <img src={medicineImage} alt="Loading..." className="loading-image" />
            <div className="loading-text" style={{ color: theme.palette.text.primary }}>DoseMinder is Loading</div>
        </div>
    );
};

export default LoadingScreen;