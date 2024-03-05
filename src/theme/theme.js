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
		third: {
			main: '#8DBFB3',
		},
		fourth: {
			main: '#59619B',
		},
		fifth: {
			main: '#62A66A',
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
			dark: '#D14F4F',
		},
		secondary: {
			main: '#F3B462',
		},
		third: {
			main: '#42766A',
		},
		fourth: {
			main: '#59619B',
		},
		fifth: {
			main: '#62A66A',
			dark: '#4D8F57',
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