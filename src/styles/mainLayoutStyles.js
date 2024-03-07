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

export const StyledProfileButton = styled(Button)(({ theme }) => ({
	marginBottom: '5px',
	width: '80%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.third.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.third.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.third.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));

export const StyledLogoutButton = styled(Button)(({ theme }) => ({
    width: '80%',
    color: 'black',
    fontWeight: 'bolder',
    fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.primary.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.primary.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.primary.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
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



//* 3D Buttons
export const Styled3DButtonRed = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.primary.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.primary.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.primary.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));

export const Styled3DButtonYellow = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.secondary.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.secondary.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.secondary.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));

export const Styled3DButtonTeal = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.third.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.third.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.third.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));


export const Styled3DButtonBlue = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.fourth.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.fourth.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.fourth.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));

export const Styled3DButtonGreen = styled(Button)(({ theme }) => ({
	width: '50%',
	color: 'black',
	fontWeight: 'bolder',
	fontFamily: 'Comfortaa',
	borderRadius: 20,
	backgroundColor: theme.palette.fifth.main,
	boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	zIndex: 1,
	'&:hover': {
        backgroundColor: theme.palette.fifth.dark,
		boxShadow: `inset 0 2px 5px ${theme.palette.mode === 'dark' ? 'white' : 'white'}, inset 0 -5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
    },
	'&:active': {
		backgroundColor: theme.palette.fifth.main,
		boxShadow: `inset 0 5px 5px ${theme.palette.mode === 'dark' ? 'black' : 'black'}`,
	},
}));