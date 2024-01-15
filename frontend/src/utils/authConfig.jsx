import React, {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';


import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

    const authToken = localStorage.getItem('token');

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(authToken);
        if (decodedToken.exp * 1000 < Date.now()) {
            console.log('Token expired. Logging out...');
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }
        return children;

    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" />;
    }
}