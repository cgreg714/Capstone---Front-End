import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdMedication } from "react-icons/md";
import { FiSettings } from 'react-icons/fi';
import { StyledListSubheader, StyledListItemIcon } from '../../../styles/mainLayoutStyles';

export const MainListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Dashboard')}>
			<StyledListItemIcon>
				<AiOutlineDashboard />
			</StyledListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Medications')}>
			<StyledListItemIcon>
				<MdMedication />
			</StyledListItemIcon>
			<ListItemText primary="Medications" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Settings')}>
			<StyledListItemIcon>
				<FiSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);
