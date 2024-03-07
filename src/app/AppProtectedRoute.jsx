import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';

export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
    const { userId, isLoading, isCheckingToken, logout } = useContext(UserContext);
	const { profileId } = useContext(ProfileContext);

	useEffect(() => {
		const checkToken = async () => {
			if (!isLoading && !userId) {
				logout();
				navigate('/login');
			}
		};

		checkToken();
	}, [userId, navigate, isLoading, logout, profileId]);

    if (isLoading || isCheckingToken || !userId) {
		return null;
	}

	return children;
};