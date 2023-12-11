import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from "../Components/Header";


export default function DefaultLayout(){

    return(
        <>
            <div className="h-screen text-gray-700">
                <div className="sticky top-0 bg-white">
                    <Header/>
                </div>

                <div className="bg-gray-100 min-h-screen">
                    <div className="container mx-auto py-5">
                        <Outlet/>
                    </div>
                </div>
            </div>


        </>

    )
}