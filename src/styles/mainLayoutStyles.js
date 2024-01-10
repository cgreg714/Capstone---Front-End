import {
	AppBar,
	Avatar,
	ListSubheader,
	ListItemIcon,
	Drawer,
	TextField,
	FormControl,
	Box,
	Card,
	Grid,
} from '@mui/material';
import { styled } from '@mui/system';

export const drawerWidth = 240;

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

//* App Bar
export const StyledAppBar = styled(AppBar)({
	position: 'sticky',
	zIndex: 999,
	backgroundColor: '#B10021',
});

//* Dashboard Drawer
export const StyledDrawer = styled(Drawer)({
	'& .MuiDrawer-paper': {
		width: drawerWidth,
		boxSizing: 'border-box',
		backgroundColor: '#B10021',
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

//* General Styles

export const StyledCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: 2,
	border: '2px solid black',
	boxShadow: `10px 10px 0px 0px ${getRandomColor()}`,
	borderRadius: '15px',
	overflow: 'hidden',
	height: 380,
});

export const StyledBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
});

export const StyledTextField = styled(TextField)({
	margin: 3,
	size: "small",
});

export const StyledFormControl = styled(FormControl)({
	margin: 3,
});

export const StyledGridItem = styled(Grid)({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'flex-start',
});