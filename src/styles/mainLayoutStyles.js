import {
	AppBar,
	Avatar,
	ListSubheader,
	ListItemIcon,
	Drawer,
} from '@mui/material';
import { styled } from '@mui/system';

export const drawerWidth = 240;

//* App Bar
export const StyledAppBar = styled(AppBar)({
	position: 'sticky',
	zIndex: 999,
	backgroundColor: '#9E1b32',
});

//* Dashboard Drawer
export const StyledDrawer = styled(Drawer)({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: '#9E1b32',
		color: '#00000',
		flexShrink: 0,
	},
});

export const StyledDrawerAvatar = styled(Avatar)({
	width: 48,
	height: 48,
});

export const StyledListSubheader = styled(ListSubheader)({
	backgroundColor: '#f3ae4b',
	color: '#000',
});

export const StyledListItemIcon = styled(ListItemIcon)({
	minWidth: 0,
	marginRight: '1.5rem',
	fontSize: '1.5rem',
	textAlign: 'center',
});
