import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'

import './App.css';

import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";

import UserProvider from "./Context/UserProvider";
import Home from "./Pages/Home";



function App() {



  return (
      <>

          <Routes>
              <Route path="/" element={<Home/>} />
          </Routes>


            <UserProvider>
                <AuthRoutes  />
                <UserRoutes />
            </UserProvider>





      </>
  );
}

export default App;
