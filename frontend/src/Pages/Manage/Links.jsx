import React, {useState, useEffect} from 'react'
import PageTitle from "../../PageTitle";

import CreateLinkModal from "../../Components/CreateLinkModal";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";

import LinkCard from "../../Components/LinkCard";
import {Link} from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import Test from "../../Components/Test";

export default function Links(){

    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [linkList, setLinkList] = useState([])


    useEffect(() => {
        getAllLinks()
    }, [])

    const getAllLinks = async () => {
        try{
            const response = await axiosInstance.get('link/get-all-links');
            console.log(response.data)
            setLinkList(response.data)


        } catch (error){
            console.log({error})
        }


    }
    const createLinkModal = () => {
        setShowCreateLinkModal(!showCreateLinkModal)
    }

    const linkSaved = () => {
        setShowCreateLinkModal(!showCreateLinkModal)
        setShowSuccessAlert(true);
        getAllLinks();
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 2000);
        console.log("saved")
    }
    return(
        <>
            <PageTitle title="Links" />

            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">My Links</h2>
                <button className="bg-black text-white text-sm px-3 rounded-md" onClick={createLinkModal}>Create Link</button>
            </div>

            <div className="grid grid-cols-4 gap-6 py-10">
                <div className="bg-white shadow-sm rounded-lg px-5 py-10">
                    <h2 className="font-bold">Filter links</h2>
                </div>
                <div className="col-span-2">

                    {linkList.map((link) => (
                        <LinkCard key={link.id} link={link} />
                    ))}

                </div>
            </div>

            {showCreateLinkModal && <CreateLinkModal createLinkModal={createLinkModal} linkSaved={linkSaved} />}
            {/*{showCreateLinkModal && <Test />}*/}
            {showSuccessAlert && <SuccessAlert  />}

        </>
    )
}