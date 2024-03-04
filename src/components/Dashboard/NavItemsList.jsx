import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdMedication } from 'react-icons/md';
import { PiPillDuotone } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
// eslint-disable-next-line
import { StyledListSubheader, StyledListItemIcon } from '../../styles/mainLayoutStyles';
import { useTheme } from '@mui/material/styles';

export const MainListItems = () => {
	const theme = useTheme();

	return (
		<React.Fragment>
			{/* <StyledListSubheader component="div" style={{ textAlign: 'center' }}>
			DoseMinder
		</StyledListSubheader> */}
			<ListItemButton component={Link} to="/dashboard">
				<StyledListItemIcon sx={{ color: theme.palette.primary.main }}>
					<BiSolidDashboard />
				</StyledListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItemButton>
			<ListItemButton component={Link} to="/medications">
				<StyledListItemIcon sx={{ color: theme.palette.primary.main }}>
					<MdMedication />
				</StyledListItemIcon>
				<ListItemText primary="Medications" />
			</ListItemButton>
			<ListItemButton component={Link} to="/drugs">
				<StyledListItemIcon sx={{ color: theme.palette.primary.main }}>
					<PiPillDuotone />
				</StyledListItemIcon>
				<ListItemText primary="Drug Checker" />
			</ListItemButton>
			<ListItemButton component={Link} to="/profile">
				<StyledListItemIcon sx={{ color: theme.palette.primary.main }}>
					<CgProfile />
				</StyledListItemIcon>
				<ListItemText primary="Profile" />
			</ListItemButton>
			{/* <ListItemButton component={Link} to="/settings">
			<StyledListItemIcon>
				<MdSettings />
			</StyledListItemIcon>
			<ListItemText primary="Settings" />
		</ListItemButton> */}
		</React.Fragment>
	);
};
