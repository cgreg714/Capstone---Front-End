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
			main: '#dcb667',
		},
		background: {
			default: '#E5E5E5',
		},
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
			main: '#dcb667',
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