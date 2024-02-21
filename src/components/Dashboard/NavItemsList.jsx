import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdMedication, MdSettings } from 'react-icons/md';
import { PiPillDuotone } from 'react-icons/pi';
import { CgProfile } from "react-icons/cg";
import { StyledListSubheader, StyledListItemIcon } from '../../styles/mainLayoutStyles';

export const MainListItems = () => (
	<React.Fragment>
		<StyledListSubheader component="div">Dashboard</StyledListSubheader>
		<ListItemButton component={Link} to="/dashboard">
			<StyledListItemIcon>
				<BiSolidDashboard />
			</StyledListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton component={Link} to="/medications">
			<StyledListItemIcon>
				<MdMedication />
			</StyledListItemIcon>
			<ListItemText primary="Medications" />
		</ListItemButton>
		<ListItemButton component={Link} to="/drugs">
			<StyledListItemIcon>
				<PiPillDuotone />
			</StyledListItemIcon>
			<ListItemText primary="Drug Checker" />
		</ListItemButton>
		<ListItemButton component={Link} to="/profile">
			<StyledListItemIcon>
				<CgProfile />
			</StyledListItemIcon>
			<ListItemText primary="Profile" />
		</ListItemButton>
		<ListItemButton component={Link} to="/settings">
			<StyledListItemIcon>
				<MdSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton>
	</React.Fragment>
);
