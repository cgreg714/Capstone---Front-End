import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ProfileContext } from '../contexts/ProfileContext';

export const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { userId, isLoading: isAuthLoading, isCheckingToken, logout } = useContext(UserContext);
	const { profileId, setProfileId, profiles, isLoading: isProfileLoading } = useContext(ProfileContext);

	const [isChecking, setIsChecking] = useState(true);

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
				} else if (profiles && profiles.length > 0) {
					navigate('/profile-selection');
				} else {
					navigate('/add-profile');
				}
			}

			setIsChecking(false);
		};

		checkToken();
	}, [userId, navigate, isAuthLoading, logout, profileId, profiles, isProfileLoading]);

	if (isChecking || isCheckingToken || !userId) {
		return null;
	}

	return children;
};