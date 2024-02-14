import React from 'react';
import { MainListItems } from './NavItemsList';
import { Box, ListItem } from '@mui/material';
import medicine from '../../assets/medicine.png';
import { StyledDrawer, drawerWidth, StyledDrawerAvatar } from '../../styles/mainLayoutStyles';

export function PermanentDrawerLeft({ setSelectedMenu }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <StyledDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                }}
                variant="permanent"
                anchor="left"
            >
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    <StyledDrawerAvatar
                        src={medicine}
                        alt="doseminder"
                        variant="square"
                    />
                </ListItem>
                <Box>
                    <MainListItems setSelectedMenu={setSelectedMenu}/>
                </Box>
            </StyledDrawer>
        </Box>
    );
}