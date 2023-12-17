import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";

export default function LinkView(){
    const {linkkey} = useParams();

    const [linkDetails, setLinkDetails] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false)


    useEffect( () => {
        getLink();
    }, [] );

    const getLink = async () => {
        setLoadingPage(true)
        try{
            const response = await axiosInstance.get(`link/get-link?key=${linkkey}`);
            setLinkDetails(response.data)
            setLoadingPage(false)
        } catch(error){
            console.log(error.name)
        }
    }

    return(
        <>
            {loadingPage ? (<LazySpinner />) : (
                <>
                    <div className="py-5">
                        <h2 className="font-bold text-2xl">{`${linkDetails.domain}/${linkDetails.link_key}`}</h2>
                    </div>
                </>
            )}

        </>
    )
}