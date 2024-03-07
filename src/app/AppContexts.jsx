import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserProvider } from '../contexts/UserContext';
import { DrugProvider } from '../contexts/DrugContext';
import { SnackbarProvider } from '../contexts/SnackbarContext';

export const ContextProviders = ({ children, error, setError, theme, setTheme }) => (
	<ErrorContext.Provider value={{ error, setError }}>
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<SnackbarProvider>
				<DrugProvider>
					<UserProvider>{children}</UserProvider>
				</DrugProvider>
			</SnackbarProvider>
		</ThemeContext.Provider>
	</ErrorContext.Provider>
);
