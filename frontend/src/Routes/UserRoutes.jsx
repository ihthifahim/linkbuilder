import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import LazySpinner from "../Components/LazySpinner";
import PrivateRoute from "../utils/authConfig";
import DefaultLayout from "../Layouts/DefaultLayout";


const Dashboard = lazy(() => import("../Pages/Manage/Dashboard"));
const Links = lazy(() => import("../Pages/Manage/Links"));

export default function AuthRoutes({user}){

    return(
        <Suspense fallback={ <LazySpinner />}>
            <Routes>
                <Route path="manage/*" element={<DefaultLayout />}>
                    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="links" element={<PrivateRoute><Links /></PrivateRoute>} />
                </Route>
            </Routes>
        </Suspense>
    )
}