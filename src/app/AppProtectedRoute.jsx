import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';

export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { userId, isLoading, isCheckingToken, logout, user } = useContext(UserContext);
	const { profileId } = useContext(ProfileContext);

	useEffect(() => {
		const checkToken = async () => {
			if (!isLoading && !userId) {
				logout();
				navigate('/login');
			} else if (!isLoading && userId) {
				if (user && user.profiles && user.profiles.length > 0) {
					if (!profileId) {
						navigate('/profile-selection');
					}
				} else {
					navigate('/add-profile');
				}
			}
		};

		checkToken();
	}, [userId, navigate, isLoading, logout, profileId]);

	if (isLoading || isCheckingToken || !userId) {
		return null;
	}

	return children;
};
