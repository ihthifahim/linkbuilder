import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'

import './App.css';

import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";

import UserProvider from "./Context/UserProvider";



function App() {



  return (
      <>


            <UserProvider>
                <AuthRoutes  />
                <UserRoutes />
            </UserProvider>





      </>
  );
}

export default App;
