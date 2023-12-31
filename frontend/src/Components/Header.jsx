import React, {useContext, useEffect, useState, useRef} from "react";
import UserContext from "../Context/UserContext";
import {Link, useLocation} from "react-router-dom";




export default function Header(){
    const { user, logout } = useContext(UserContext);
    const location = useLocation();
    const [isProfileMenuVisible, setProfileMenuVisibility] = useState(false);

    const showProfileMenu = () => {
        setProfileMenuVisibility(!isProfileMenuVisible);
    };

    const closeProfileMenu = () => {
        setProfileMenuVisibility(false);
    };

    const profileMenuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                closeProfileMenu();
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const firstName = user ? user.firstname : '';

    return(
        <>
            <div className="flex justify-between container mx-auto py-5 mb-5">
                <div className="">
                    <Link to="/manage/links"><img src="/assets/images/logonew.png" className="w-20" /></Link>
                </div>
                <div className="flex">
                    <div className=""></div>
                    <div className="relative" ref={profileMenuRef}>
                        <div className="inline-flex items-center overflow-hidden bg-white">
                            <div className="mr-3 hover:cursor-pointer" onClick={showProfileMenu}>Hi {firstName}</div>
                            {/*<button onClick={showProfileMenu}>*/}
                            {/*    <img alt="profile Image" src="/assets/images/profileimg.jpg" className="w-10 rounded-full" />*/}
                            {/*</button>*/}
                        </div>
                        <div
                            id="profileMenu"
                            className={`${
                                isProfileMenuVisible ? 'absolute' : 'hidden'
                            } end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg`}
                            role="menu"
                        >
                            <div className="p-2">
                                <a href="/manage/profile/settings"  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"  role="menuitem">
                                    Settings
                                </a>
                                <a href="#" onClick={logout} className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">
                                    Sign Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 px-5">
                <div className="container mx-auto">
                    <div className="">
                        <div className="">
                            <nav className="-mb-px flex gap-6" aria-label="Tabs">
                                {/* <Link to="/manage/dashboard" className={`shrink-0 px-1 pb-4 text-sm font-medium hover:text-sky-600 ${location.pathname === '/manage/dashboard' ? 'border-b-2 text-sky-600 border-sky-500' : 'text-gray-500'} `}>
                                    Dashboard
                                </Link> */}

                                <Link to="/manage/links" className={`shrink-0 px-1 pb-4 text-sm font-medium hover:text-sky-600 ${location.pathname === '/manage/links' ? 'border-b-2 text-sky-600 border-sky-500' : 'text-gray-500'} `} aria-current="page">
                                    Links
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}