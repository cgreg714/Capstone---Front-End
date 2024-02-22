import { ErrorContext } from '../contexts/ErrorContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserProvider } from '../contexts/UserContext';
import { DrugProvider } from '../contexts/DrugContext';
import { SnackbarProvider } from '../contexts/SnackbarContext';
import { NotificationProvider } from '../contexts/NotificationContext';

export const ContextProviders = ({ children, error, setError, theme, toggleTheme }) => (
	<ErrorContext.Provider value={{ error, setError }}>
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<SnackbarProvider>
				<DrugProvider>
					<UserProvider>
						<NotificationProvider>{children}</NotificationProvider>
					</UserProvider>
				</DrugProvider>
			</SnackbarProvider>
		</ThemeContext.Provider>
	</ErrorContext.Provider>
);