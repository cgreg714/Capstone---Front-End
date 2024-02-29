import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';
import LoadingBar from '../components/LoadingScreen';

export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
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
			} else if (!isAuthLoading && !isProfileLoading && userId) {
				if (profileId) {
				} else if (profiles && profiles.length === 0) {
					navigate('/add-profile');
				} else {
					navigate('/profile-selection');
				}
			}
		};

		checkToken();
	}, [userId, navigate, isAuthLoading, logout, profileId, profiles, isProfileLoading]);

	useEffect(() => {
		setIsLoading(false);
	}, [location]);

	if (isLoading || isCheckingToken || !userId) {
		return <LoadingBar />;
	}

	return children;
};
