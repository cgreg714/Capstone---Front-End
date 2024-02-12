import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdMedication, MdSettings } from "react-icons/md";
import { FiSettings } from 'react-icons/fi';
import { PiPillDuotone } from 'react-icons/pi';
import { StyledListSubheader, StyledListItemIcon } from '../../styles/mainLayoutStyles';

export const MainListItems = ({ setSelectedMenu }) => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton onClick={() => setSelectedMenu('Dashboard')}>
			<StyledListItemIcon>
				<BiSolidDashboard />
			</StyledListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Medications')}>
			<StyledListItemIcon>
				<MdMedication />
			</StyledListItemIcon>
			<ListItemText primary="Medications" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Drug Checker')}>
			<StyledListItemIcon>
				<PiPillDuotone />
			</StyledListItemIcon>
			<ListItemText primary="Drug Checker" />
		</ListItemButton>
		<ListItemButton onClick={() => setSelectedMenu('Settings')}>
			<StyledListItemIcon>
				<MdSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);
