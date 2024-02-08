import { createTheme } from '@mui/material/styles';

export const colors = [
	'#632B30',
	'#D58936',
	'#DEAE33',
	'#B39C4D',
	'#007CBE',
	'#94BFBE',
	'#9E4770',
	'#D65780',
	'#384D48',
];


const styleOverrides = {
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& $notchedOutline': {
						borderColor: 'black',
					},
					'&:hover $notchedOutline': {
						borderColor: 'black',
					},
					'&.Mui-focused $notchedOutline': {
						borderColor: 'black',
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					'&:focus': {
						borderColor: 'black',
					},
				},
			},
		},
	},
};

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#9E1b32',
		},
		secondary: {
			main: '#dcb667',
		},
	},
	...styleOverrides,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#9E1b32',
		},
		secondary: {
			main: '#dc7b67',
		},
		background: {
			default: '#333333',
		},
	},
	components: {
		...styleOverrides,
	},
});

export { lightTheme, darkTheme };