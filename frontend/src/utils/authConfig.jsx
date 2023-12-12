import React, {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';


import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {

    const authToken = localStorage.getItem('token');
    const user = localStorage.getItem('user')



    if (!authToken || !user) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(authToken);
        // return decodedToken.userId;
        return children;
    } catch (error) {
        console.error('Error decoding token:', error);

        // If there's an error decoding the token, redirect to the login page
        return <Navigate to="/login" />;
    }

    // return children;
}