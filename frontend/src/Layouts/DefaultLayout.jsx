import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Header from "../Components/Header";


export default function DefaultLayout(){

    return(
        <>
            <div className="h-auto text-gray-700 ">
                <div className="sticky top-0 bg-white px-5 md:px-5 lg:px-5 xl:px-1 z-20">
                    <Header/>
                </div>

                <div className="bg-gray-100 min-h-screen px-5 md:px-5 lg:px-5 xl:px-1">
                    <div className="container mx-auto py-5">
                        <Outlet/>
                    </div>
                </div>
            </div>


        </>

    )
}