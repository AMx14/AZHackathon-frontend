import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            // Clear the access token from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;