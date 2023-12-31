import React, {useState, useEffect} from 'react'

import axiosInstance from '../../../utils/axiosConfig';

import {Link, useNavigate} from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";


import UtmCardEdit from './UtmCardEdit';

export default function EditLink({linkDetails, handleEdit}){
    const history = useNavigate();
    const [favicon, setFavicon] = useState(linkDetails.page_favicon)
    const [domain, setDomain] = useState(linkDetails.domain);
    const [linkkey, setLinkKey] = useState(linkDetails.link_key);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [showAlert, setShowAlert] = useState(false)

    const [url, setUrl] = useState(linkDetails.destinationURL)
    const [validationURL, setValidationURL] = useState(false)
    const [utm, setUtm] = useState(false);

    const [metaTags, setMetaTags] = useState([]);
    const [utmTags, setUtmTags] = useState([
        { key: 'utm_campaign', value: linkDetails.utm_campaign },
        { key: 'utm_content', value: linkDetails.utm_content },
        { key: 'utm_medium', value: linkDetails.utm_medium },
        { key: 'utm_source', value: linkDetails.utm_source },
        { key: 'utm_term', value: linkDetails.utm_term },
      ]);

    useEffect(() => {
        checkIsUTM();
    },[])

    useEffect(() => {
        if(url !== ""){
            fetchLinkPreview()
        }
    }, [url])


    const appendURLwithUTM = (key, value) => {
        setUtmTags((prevTags) => {
            const existingTagIndex = prevTags.findIndex((tag) => tag.key === key);
            
            if (existingTagIndex !== -1) {
                const updatedTags = [...prevTags];
                updatedTags[existingTagIndex].value = value;
                return updatedTags;
            } else {
                return [...prevTags, { key, value }];
            }
        });
    }

    const checkIsUTM = () => {
        const hasUtm = Object.values(utmTags).some(value => value !== null && value !== '');
        setUtm(hasUtm);
    }

    const handleURLInput = (event) => {
        const inputURL = event.target.value;
        setUrl(inputURL);
        setIsValid(isValidURL(inputURL));
    }

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    const handleDeleteLink = async () => {
        const linkDelete = window.confirm("Are you sure you want to delete this link? All data for this link will be deleted");
        if (linkDelete) {
            try{
                const response = await axiosInstance.get(`link/delete-link/${linkDetails.link_key}`)
                if(response.data.message === "link deleted"){
                    handleEdit();
                    history('/manage/links');
                }
            } catch(error){

            }
        } else {  
            console.log("canceled deletion");
        }
    }

 

    const fetchLinkPreview = async () => {
        try{
            const formData = {
                url
            }

            if(isValid){
                const response = await axiosInstance.post('link/fetch-preview', formData)
                setMetaTags(response.data)
            } else {
                setMetaTags([{
                    title: "Page Title",
                    description: "Page Description",
                    image: "",
                    favicon: ""
                }])
            }
        } catch(error){
        }

    }



    const submitForm = async () => {
        const token = localStorage.getItem('token')
        const utmSourceObject = utmTags.find(tag => tag.key === 'utm_source');
        const utmMediumObject = utmTags.find(tag => tag.key === 'utm_medium');
        const utmCampaignObject = utmTags.find(tag => tag.key === 'utm_campaign');
        const utmTermObject = utmTags.find(tag => tag.key === 'utm_term');
        const utmContentObject = utmTags.find(tag => tag.key === 'utm_content');

        if(!utm){
            const formData = {
                token,
                link_key: linkkey,
                url,
                page_title: metaTags.title,
                page_description: metaTags.description,
                page_image: metaTags.image,
                page_favicon: metaTags.favicon,
                utm_source: null,
                utm_medium: null,
                utm_campaign: null,
                utm_term: null,
                utm_content: null,
            }
            return await axiosInstance.post('link/update', formData);
        } else {
            const formData = {
                token,
                link_key: linkkey,
                url,
                page_title: metaTags.title,
                page_description: metaTags.description,
                page_image: metaTags.image,
                page_favicon: metaTags.favicon,
                utm_source: utmSourceObject ? utmSourceObject.value : '',
                utm_medium: utmMediumObject ? utmMediumObject.value : '',
                utm_campaign: utmCampaignObject ? utmCampaignObject.value : '',
                utm_term: utmTermObject ? utmTermObject.value : '',
                utm_content: utmContentObject ? utmContentObject.value : '',
            }
            return await axiosInstance.post('link/update', formData);
           
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await submitForm();
            if(response.data.message === "updated"){
                handleEdit();
            }

            
        } catch(error){

        }
    }


    return(<>
    <div className='flex justify-center items-center animate-fade-in fixed  inset-0 z-40 bg-gray-100 bg-opacity-50 backdrop-blur-sm px-5'>
        <div className='bg-white p-10 w-full lg:w-3/4 xl:w-3/6 rounded-2xl max-h-screen  overflow-x-auto'>
            <div className="">
                <div>
                    
                    <div className="mb-5 flex justify-between items-center">
                        <img alt="page favicon" src={favicon} className="w-20 rounded-full" />
                        <button onClick={handleDeleteLink} className='bg-red-200 p-2 rounded-md text-red-700'><HiOutlineTrash /></button>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-lg mb-5">{domain}/{linkkey}</h1>
                    </div>

                    <div className="mt-5">
                        <div className="col-span-6 sm:col-span-3 mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL</label>
                            <input onChange={handleURLInput} defaultValue={url} type="text" className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full border p-2 rounded-md focus:outline-none sm:text-sm"/>
                            {validationURL && <span className="text-red-700 text-sm mt-2">{validationURL}</span>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                        </div>

                        <div className="py-10">
                            <div className=" flex justify-center items-center">
                                <div className="h-[1px] bg-gray-400 flex-grow"></div>
                                <div className="mx-4 text-xs text-gray-500">Optional</div>
                                <div className="h-[1px] bg-gray-400 flex-grow"></div>
                            </div>

                            <div className="mt-5 flex justify-between items-center">
                                <h2 className="text-sm font-bold ">UTM Builder</h2>

                                <label htmlFor="AcceptConditions" className="relative h-4 w-7 cursor-pointer [-webkit-tap-highlight-color:_transparent]">
                                    <input checked={utm} onChange={(e) => setUtm(e.target.checked)} type="checkbox" id="AcceptConditions" className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"/>
                                    <span className="absolute inset-y-0 start-0 z-10 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-3 peer-checked:text-green-600 peer-checked:bg-green-500">
                                    </span>
                                    <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-300"></span>
                                </label>
                            </div>
                            {utm && <UtmCardEdit appendURLwithUTM={appendURLwithUTM} utmTags={utmTags} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between ">
                <form onSubmit={handleSubmit}>
                    {loadingSubmit && <button className="bg-gray-400 text-white px-5 py-2 text-sm rounded-md" disabled={true}>Saving link...</button>}
                    {!loadingSubmit && <button className="bg-black text-white px-5 py-2 text-sm rounded-md">Update Link</button>}
                </form>
                <button className="border border-gray-600 px-5 py-2 text-sm rounded-md" disabled={loadingSubmit}  onClick={handleEdit}>Cancel</button>
            </div>
        </div>

    </div>
    </>)
}