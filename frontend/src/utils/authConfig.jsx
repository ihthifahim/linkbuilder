import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {


    const authToken = localStorage.getItem('token');
    const user = localStorage.getItem('user')

    if (!authToken || !user) {
        return <Navigate to="/login" />;
    }

    return children;
}