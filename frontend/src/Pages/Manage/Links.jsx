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

    }
    return(
        <div className='w-full md:w-3/4 xl:w-2/4 mx-auto'>
            <PageTitle title="Links" />

            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">My Links</h2>
                <button className="bg-black text-white text-sm px-3 rounded-md" onClick={createLinkModal}>Create Link</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10">
                {/* <div className="lg:col-span-4 scrollbar-hide px-5 py-5 sticky top-40 hidden max-h-[calc(100vh-150px)] self-start overflow-auto rounded-lg border border-gray-100 bg-white shadow lg:block">
                    <h2 className="font-bold">Filter links</h2>
                </div> */}
                <div className="auto-rows-min  grid-cols-1 lg:col-span-12">
                    {linkList.map((link) => (
                        <LinkCard key={link.id} link={link} />
                    ))}
                </div>
            </div>

            {showCreateLinkModal && <CreateLinkModal createLinkModal={createLinkModal} linkSaved={linkSaved} />}
            {/*{showCreateLinkModal && <Test />}*/}
            {showSuccessAlert && <SuccessAlert  />}

        </div>
    )
}