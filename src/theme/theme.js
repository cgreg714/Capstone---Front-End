import { createTheme } from '@mui/material/styles';

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
			main: '#AA384C',
		},
		secondary: {
			main: '#9e521b',
		},
		background: {
			default: '#E5E5E5',
		},
		third: {
			main: '#136E57',
		},
		hoverGrey: '#828A8F',
	},
	...styleOverrides,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#AA384C',
		},
		secondary: {
			main: '#9e521b',
		},
		third: {
			main: '#136E57',
		},
		background: {
			default: '#333333',
		},
		hoverGrey: '#828A8F',
	},
	components: {
		...styleOverrides,
	},
});

export { lightTheme, darkTheme };