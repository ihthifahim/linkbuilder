import React, {useRef, useState, useEffect} from "react";
import LinkCopied from "./Alerts/LinkCopied";
import {Link} from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

import { HiOutlineTrash, HiOutlineChartPie, HiOutlineEllipsisHorizontal } from "react-icons/hi2";


export default function LinkCard({link, getAllLinks}){
    const linkRef = useRef();
    const [isCopied, setIsCopied] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState("");


    useEffect(() => {
        calculateTimeElapsed();
        const intervalId = setInterval(() => {
            calculateTimeElapsed();
        }, 60000);
        return () => clearInterval(intervalId);
    }, [link.createdAt]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (linkCardMenuRef.current && !linkCardMenuRef.current.contains(event.target)) {
                closeLinkMenu();
            }
        };
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    

    const handleCopyToClipboard = () => {
        const linkText = linkRef.current.textContent;
        console.log(linkText)

        const tempInput = document.createElement('input');
        tempInput.value = linkText;
        document.body.appendChild(tempInput);

        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        document.execCommand('copy');

        document.body.removeChild(tempInput);

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    const [isLinkCardMenu, setIsLinkCardMenu] = useState(false);
    const showLinkCardMenu = () => {
        setIsLinkCardMenu(!isLinkCardMenu);
    };
    const closeLinkMenu = () => {
        setIsLinkCardMenu(false);
    };

    const linkCardMenuRef = useRef();


    const calculateTimeElapsed = () => {
        const createdTime = new Date(link.createdAt);
        const currentTime = new Date();

        const timeDifference = currentTime - createdTime;
        const minutesElapsed = Math.floor(timeDifference / (60 * 1000));
        const hoursElapsed = Math.floor(minutesElapsed / 60);

        let elapsedTime = "";
        if (hoursElapsed >= 24) {
            const daysElapsed = Math.floor(hoursElapsed / 24);
            elapsedTime = `${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago`;
        } else if (hoursElapsed > 0) {
            elapsedTime = `${hoursElapsed} ${hoursElapsed === 1 ? "hour" : "hours"} ago`;
        } else {

            elapsedTime = `${minutesElapsed} ${minutesElapsed === 1 ? "minute" : "minutes"} ago`;
        }

        if(elapsedTime === "0 minutes ago"){
            setTimeElapsed("just now");
        } else {
            setTimeElapsed(elapsedTime);
        }


    };

    const handleDeleteLink = async () => {
        const linkDelete = window.confirm("Are you sure you want to delete this link? All data for this link will be deleted");
        if (linkDelete) {
            try{
                const response = await axiosInstance.get(`link/delete-link/${link.link_key}`)
                if(response.data.message === "link deleted"){
                    closeLinkMenu()
                    getAllLinks();
                }
            } catch(error){

            }
        } else {
            
            console.log("canceled deletion");
        }
    }

    const convertTimeZone = (utcTime) => {
        const userTimeZone = localStorage.getItem('locale') || 'UTC';
        return new Date(utcTime).toLocaleString('en-us', { timeZone: userTimeZone});
      }

    const truncatedURL =
        link.destinationURL && link.destinationURL.length > 50
            ? `${link.destinationURL.slice(0, 50)}...`
            : link.destinationURL;

    return(
        <>
        
            <div className="bg-white shadow-sm rounded-lg py-5 px-5 flex items-center hover:shadow-lg mb-5">
                <div className="hidden md:block">
                    <img alt="profile" src={link.page_favicon} className="w-16 rounded-full" />
                </div>
                <div className="w-full md:ml-5">
                    <h2 className="font-bold text-lg text-blue-600" ref={linkRef}>
                        <Link to={`/manage/links/${link.link_key}`}>
                        gum.lk/{link.link_key}
                        </Link>
                        <button onClick={handleCopyToClipboard} className=" ml-3 group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"><span className="sr-only"></span><svg fill="none" shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" className="text-gray-700 transition-all group-hover:text-blue-800"><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path></svg></button>
                    </h2>
                    <a href={link.destinationURL} className="text-xs text-gray-600 hover:text-black hover:underline">{truncatedURL}</a>
                    <p className="text-xs text-gray-400 mt-1">Created {timeElapsed} | Last Clicked {convertTimeZone(link.last_click_date)}</p>
                </div>
                <div className="w-32">
                    <div className="text-gray-500 text-center py-1 text-sm">
                        {link.total_clicks.toLocaleString()} clicks
                    </div>
                </div>
                <div className="">
                    
                <div className="relative" ref={linkCardMenuRef}>
                        <div className="inline-flex items-center overflow-hidden bg-white">
                            <div className="mr-3 hover:cursor-pointer p-2" onClick={showLinkCardMenu}><HiOutlineEllipsisHorizontal /></div>
                        </div>
                        <div
                            id="profileMenu"
                            className={`${
                                isLinkCardMenu ? 'absolute' : 'hidden'
                            } end-0 z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white shadow-lg`}
                            role="menu"
                        >
                            <div className="p-1">

                                <Link to={`/manage/links/${link.link_key}`} className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center" role="menuitem">
                                    <HiOutlineChartPie /> <span className="ml-2">View Analytics</span>
                                </Link>
                                <a href="#" onClick={handleDeleteLink} className="block rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 flex items-center justify-end" role="menuitem">
                                    <HiOutlineTrash /> <span className="ml-2">Delete</span>
                                </a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            {isCopied && <LinkCopied />}

        </>
    )
}