import React, {useState, useEffect, useContext} from 'react'
import axiosInstance from "../../utils/axiosConfig";

import UpdatedAlert from "../../Components/Alerts/UpdatedAlert"




export default function ProfileSettings(){

    const [userState, setUserState] = useState([]);
    const [file, setFile] = useState(null);
    const [fileValidation, setFileValidation] = useState("");

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [showUpdateAlert, setShowUpdateAlert] = useState(false)

    useEffect(() => {
        getUser();
    },[])

    const getUser = async () => {
        try{
            const response = await axiosInstance.get('user/get-user');
            setFirstName(response.data.user.firstName)
            setLastName(response.data.user.lastName)
            setEmail(response.data.user.email)

        } catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            firstname,
            lastname,
            email
        }
        try{
            const response = await axiosInstance.post('user/update-user', formData);
            if(response.data.message === 'updated'){
                setShowUpdateAlert(true)
                setTimeout(() => {
                    setShowUpdateAlert(false);
                }, 2000);
            }
        } catch(error) {
            console.log(error)
        }
    }


    return(
        <>
            {showUpdateAlert && <UpdatedAlert message={"Profile information updated!"}  />}
        <div className="">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
        </div>

        <div className="w-2/6 mt-5">
            <div className="bg-white rounded-lg px-5 py-10 border">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstname} className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full border p-2 rounded-md focus:outline-none sm:text-sm"/>
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastname} className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full border p-2 rounded-md focus:outline-none sm:text-sm"/>
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label><small className="mb-2 block">your email that you use to login</small>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full border p-2 rounded-md focus:outline-none sm:text-sm"/>
                    </div>

                    <button type="submit" className="bg-black py-2 rounded-lg text-white px-2 text-sm mt-5">Save Changes</button>
                </form>


            </div>

        </div>
        </>
    )
}