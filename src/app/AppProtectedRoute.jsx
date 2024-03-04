import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';
import LoadingScreen from '../components/Loading/LoadingScreen';

export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { userId, isLoading: isAuthLoading, isCheckingToken, logout } = useContext(UserContext);
	const { profileId, setProfileId, profiles, isLoading: isProfileLoading } = useContext(ProfileContext);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedProfileId = localStorage.getItem('profileId');
		if (storedProfileId) {
			setProfileId(storedProfileId);
		}
	}, [setProfileId]);

	useEffect(() => {
		const checkToken = async () => {
			if (!isAuthLoading && !userId) {
				logout();
				navigate('/login');
				setIsLoading(false);
			} else if (!isAuthLoading && !isProfileLoading && userId) {
				if (profileId) {
					setIsLoading(false);
				} else if (profiles && profiles.length === 0) {
					navigate('/add-profile');
					setIsLoading(false);
				} else if (profiles && profiles.length === 1) {
					navigate('/dashboard');
					setIsLoading(false);
				} else {
					navigate('/profile-selection');
					setIsLoading(false);
				}
			}
		};

		checkToken();
	}, [userId, navigate, isAuthLoading, logout, profileId, profiles, isProfileLoading]);

	if (isLoading || isCheckingToken || !userId) {
		return <LoadingScreen />;
	}

	return children;
};
