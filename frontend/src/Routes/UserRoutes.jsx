import React, { lazy, Suspense, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import LazySpinner from "../Components/LazySpinner";
import PrivateRoute from "../utils/authConfig";
import DefaultLayout from "../Layouts/DefaultLayout";
import ProfileSettings from "../Pages/Manage/ProfileSettings";


const LinkView = lazy(() => import("../Pages/Manage/LinkView"));
const Dashboard = lazy(() => import("../Pages/Manage/Dashboard"));
const Links = lazy(() => import("../Pages/Manage/Links"));

export default function UserRoutes({user}){

    return(
        <Suspense fallback={ <LazySpinner />}>
            <Routes>
                <Route path="manage/*" element={<DefaultLayout />}>
                    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="profile/settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />

                    {/*Link Routes*/}
                    <Route path="links" element={<PrivateRoute><Links /></PrivateRoute>} />
                    <Route path="links/:linkkey" element={<PrivateRoute><LinkView /></PrivateRoute>}/>


                </Route>
            </Routes>
        </Suspense>
    )
}