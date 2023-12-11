import React, {useContext} from "react";
import UserContext from "../Context/UserContext";
import {Link} from "react-router-dom";


export default function Header(){
    const {user, logout} = useContext(UserContext)
    const firstName = user ? user.firstname : '';

    return(
        <>

            <div className="flex justify-between container mx-auto py-5 mb-5">
                <div className="">
                    Hi {firstName}
                </div>
                <div className="">
                    <span className="text-sm" onClick={logout}>Logout</span>
                </div>
            </div>
            <div className="border-b border-gray-200">
                <div className="container mx-auto">
                    <div className="sm:hidden">
                        <label className="sr-only">Tab</label>
                        <select id="Tab" className="w-full rounded-md border-gray-200">
                            <option>Settings</option>
                            <option>Messages</option>
                            <option>Archive</option>
                            <option>Notifications</option>
                        </select>
                    </div>

                    <div className="hidden sm:block">
                        <div className="">
                            <nav className="-mb-px flex gap-6" aria-label="Tabs">
                                <Link to="/manage/dashboard" className="shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600">
                                    Dashboard
                                </Link>
                                <Link to="/manage/links" className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" aria-current="page">
                                    Links
                                </Link>
                                <a href="#" className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" aria-current="page">
                                    Settings
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}