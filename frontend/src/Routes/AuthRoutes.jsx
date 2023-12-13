import React, { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import LazySpinner from "../Components/LazySpinner";

// const Login = lazy(() => import("../Pages/Authentication/Login"));

import Login from "../Pages/Authentication/Login"
import Register from "../Pages/Authentication/Register";


export default function AuthRoutes({setUser}){
    return(
        // <Suspense fallback={ <LazySpinner />}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        // </Suspense>
    )
}