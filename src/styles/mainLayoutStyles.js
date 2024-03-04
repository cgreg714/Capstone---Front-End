import { AppBar, Avatar, ListSubheader, ListItemIcon, Drawer, Button } from '@mui/material';
import { styled } from '@mui/system';

export const drawerWidth = 240;

//* App Bar
export const StyledAppBar = styled(AppBar)({
	position: 'sticky',
	zIndex: 999,
	backgroundColor: '#F3B462',
});

//* Dashboard Drawer
export const StyledDrawer = styled(Drawer)({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: '#F3B462',
		color: '#000000 !important',
		flexShrink: 0,
	},
	'& .MuiDrawer-paper .MuiTypography-root': {
        color: '#000000 !important',
    },
});

export const StyledDrawerAvatar = styled(Avatar)({
	width: 48,
	height: 48,
});

export const StyledListSubheader = styled(ListSubheader)({
	backgroundColor: '#F3B462',
	color: '#000',
});

export const StyledProfileButton = styled(Button)(({
	marginBottom: '5px',
	width: '80%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 10,
	zIndex: 1,
	'&:hover': {
		boxShadow: 'inset 0 -10px 10px #F3B462',
	},
}));

export const StyledLogoutButton = styled(Button)(({
    width: '80%',
    color: 'black',
    fontWeight: 'bolder',
    fontFamily: 'Comfortaa',
    borderRadius: 10,
    zIndex: 1,
    '&:hover': {
        boxShadow: `inset 0 -10px 10px #F3B462`,
    },
}));

export const StyledListItemIcon = styled(ListItemIcon)({
	minWidth: 0,
	marginRight: '1.5rem',
	fontSize: '1.5rem',
	textAlign: 'center',
});

//* Footer
export const StyledFooter = styled('footer')({
	position: 'relative',
	flexShrink: 0,
	width: '100%',
	height: '2.5rem',
});
export const Styled3DButton = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.fifth.main,
	boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
		backgroundColor: theme.palette.fifth.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));