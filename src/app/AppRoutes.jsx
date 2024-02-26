import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import ProfileSelectionPage from '../components/Profile/ProfileSelection';
import AddProfilePage from '../pages/AddProfile';
import MainLayout from '../pages/MainLayout';
import Dashboard from '../pages/Dashboard';
import Medications from '../pages/Medications';
import Drugs from '../pages/Drugs';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ForgotPasswordPage from '../pages/ForgotPassword';
import VerifyOTP from '../pages/VerifyOTP';
import ResetPassword from '../pages/ResetPassword';
import { ProtectedRoute } from './AppProtectedRoute';

export const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-profile" element={<ProtectedRoute><AddProfilePage /></ProtectedRoute>} />
        <Route path="/profile-selection" element={<ProtectedRoute><ProfileSelectionPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/medications" element={<ProtectedRoute><MainLayout><Medications /></MainLayout></ProtectedRoute>} />
        <Route path="/drugs" element={<ProtectedRoute><MainLayout><Drugs /></MainLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/*" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
    </Routes>
);