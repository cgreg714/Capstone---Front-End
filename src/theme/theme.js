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
			main: '#F06060',
		},
		secondary: {
			main: '#F3B462',
		},
		background: {
			default: '#E5E5E5',
		},
		third: {
			main: '#8DBFB3',
		},
		hoverGrey: '#2C3A47',
		cardBackground: '#8DBFB3',
		accordionBackground: '#F06060',
	},
	typography: {
        fontFamily: 'Comfortaa, sans-serif',
    },
	...styleOverrides,
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#F06060',
		},
		secondary: {
			main: '#F3B462',
		},
		third: {
			main: '#8DBFB3',
		},
		background: {
			default: '#333333',
		},
		hoverGrey: '#2C3A47',
		cardBackground: '#8DBFB3',
		accordionBackground: '#F06060',
	},
	typography: {
        fontFamily: 'Comfortaa, sans-serif',
    },
	components: {
		...styleOverrides,
	},
});

export { lightTheme, darkTheme };