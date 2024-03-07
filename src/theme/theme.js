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
			dark: '#903A3A',
		},
		secondary: {
			main: '#F3B462',
			dark: '#916C3A',
		},
		third: {
			main: '#8DBFB3',
			dark: '#55736C',
		},
		fourth: {
			main: '#59619B',
			dark: '#3E446D',
		},
		fifth: {
			main: '#62A66A',
			dark: '#3B633F',
		},
		background: {
			default: '#E5E5E5',
		},
		hoverGrey: '#2C3A47',
		cardBackground: '#8DBFB3',
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
			dark: '#903A3A',
		},
		secondary: {
			main: '#F3B462',
			dark: '#916C3A',
		},
		third: {
			main: '#42766A',
			dark: '#27463F',
		},
		fourth: {
			main: '#59619B',
			dark: '#3E446D',
		},
		fifth: {
			main: '#62A66A',
			dark: '#3B633F',
		},
		background: {
			default: '#363732',
		},
		hoverGrey: '#2C3A47',
		cardBackground: '#8DBFB3',
	},
	typography: {
        fontFamily: 'Comfortaa, sans-serif',
    },
	components: {
		...styleOverrides,
	},
});

export { lightTheme, darkTheme };