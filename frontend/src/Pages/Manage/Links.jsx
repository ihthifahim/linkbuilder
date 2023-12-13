import React, {useState} from 'react'
import PageTitle from "../../PageTitle";

import CreateLinkModal from "../../Components/CreateLinkModal";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";

export default function Links(){

    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const createLinkModal = () => {
        setShowCreateLinkModal(!showCreateLinkModal)
    }

    const linkSaved = () => {
        setShowCreateLinkModal(!showCreateLinkModal)
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 2000);
        console.log("saved")
    }
    return(
        <>
            <PageTitle title="Links" />

            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Links</h2>
                <button className="bg-black text-white text-sm px-3 rounded-md" onClick={createLinkModal}>Create Link</button>
            </div>

            {showCreateLinkModal && <CreateLinkModal createLinkModal={createLinkModal} linkSaved={linkSaved} />}
            {showSuccessAlert && <SuccessAlert  />}

        </>
    )
}