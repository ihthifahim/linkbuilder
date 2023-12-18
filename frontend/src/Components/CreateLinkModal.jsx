import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../utils/axiosConfig";
import UtmCard from "./UtmCard";

export default function CreateLinkModal({createLinkModal, linkSaved}){
    const navigate = useNavigate()
    const [metaTags, setMetaTags] = useState([]);

    const [destinationURL, setDestinationURL] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [linkKey, setLinkKey] = useState("");
    const [linkKeyLoad, setLinkKeyLoad] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [validationURL, setValidationURL] = useState([])
    const [validationKey, setValidationKey] = useState("");

    const [utm, setUtm] = useState(false);
    const [utmTags, setUtmTags] = useState([]);

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }


    useEffect(() => {
        if(destinationURL !== ""){
            fetchLinkPreview()
        }

    }, [destinationURL])

    const handleURLInput = (event) => {
        const inputURL = event.target.value;
        setDestinationURL(inputURL);
        setIsValid(isValidURL(inputURL));
    }


    const fetchLinkPreview = async () => {
        generateLinkKey();
        console.log(destinationURL)

        try{
            const formData = {
                url: destinationURL
            }

            if(isValid){
                const response = await axiosInstance.post('link/fetch-preview', formData)
                setMetaTags(response.data)
                console.log(response.data)
            } else {
                setMetaTags([{
                    title: "Page Title",
                    description: "Page Description",
                    image: "",
                    favicon: ""
                }])
            }
        } catch(error){

            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }

    }

    const truncatedDescription =
        metaTags.description && metaTags.description.length > 100
            ? `${metaTags.description.slice(0, 100)}...`
            : metaTags.description;

    const generateLinkKey = async () => {
        try{
            setLinkKeyLoad(true)
            await axiosInstance.get(`link/get-link-key`).then((res) => {
                setLinkKey(res.data);
                setLinkKeyLoad(false)
            })
        } catch(error){
            console.log(error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }

    }


    const appendURLwithUTM = (key, value) => {
        setUtmTags((prevTags) => {
            const existingTagIndex = prevTags.findIndex((tag) => tag.key === key);

            if (existingTagIndex !== -1) {
                // If the tag already exists, update its value
                const updatedTags = [...prevTags];
                updatedTags[existingTagIndex].value = value;
                return updatedTags;
            } else {
                // If the tag doesn't exist, add a new one
                return [...prevTags, { key, value }];
            }
        });
    }

    const handleSubmit = async (e) => {
        setLoadingSubmit(true)
        e.preventDefault()
        const utmQueryString = utmTags
            .map((tag) => `${encodeURIComponent(tag.key)}=${encodeURIComponent(tag.value)}`)
            .join('&');

        const finalURL = `${destinationURL}${utmQueryString ? `?${utmQueryString}` : ''}`;



        try{
            if(destinationURL !== "" && linkKey !== ""){
                const token = localStorage.getItem('token')

                // const utmQueryString = utmTags.map(tag => `${encodeURIComponent(tag.key)}=${encodeURIComponent(tag.value)}`).join('&');
                // const finalURL = `${destinationURL}${utmQueryString ? `?${utmQueryString}` : ''}`;
                const utmSourceObject = utmTags.find(tag => tag.key === 'utm_source');
                const utmMediumObject = utmTags.find(tag => tag.key === 'utm_medium');
                const utmCampaignObject = utmTags.find(tag => tag.key === 'utm_campaign');
                const utmTermObject = utmTags.find(tag => tag.key === 'utm_term');
                const utmContentObject = utmTags.find(tag => tag.key === 'utm_content');

                const formData = {
                    token,
                    link_key: linkKey,
                    destinationURL,
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


                const response = await axiosInstance.post('link/save', formData);
                console.log(response.data)
                if(response.data.message === "link saved"){
                    setLoadingSubmit(false);
                    setLinkKey("");
                    setDestinationURL("");
                    setMetaTags([]);
                    linkSaved();

                } else if(response.data.message === "key exists"){
                    setValidationKey("Link already exists")
                    setLoadingSubmit(false)
                }
            }

            if(linkKey === ""){
                setValidationKey("Please enter a link key");
                setLoadingSubmit(false)
            }

            if(destinationURL === ""){
                setValidationURL("Please enter a valid Destination URL")
                setLoadingSubmit(false)
            }



        } catch(error) {
            setLoadingSubmit(false)
            if (error.response && error.response.status === 401) {
                navigate('/login?session=timedout');
            }
            console.log(error)
        }
    }

    return(
        <>
            <div className="flex justify-center items-center animate-fade-in fixed inset-0 z-40 bg-gray-100 bg-opacity-50 backdrop-blur-md px-5">
                <div className="bg-white p-10 w-full lg:w-3/4 xl:w-3/6 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                        <div className="">
                            {metaTags.favicon &&
                                <div className="mb-5">
                                    <img alt="page favicon" src={metaTags.favicon} className="w-20 rounded-full" />
                                </div>
                            }
                            <div className="flex justify-between">
                                <h1 className="font-bold text-lg mb-5">Create your short link</h1>
                            </div>
                            <div className="mt-5">
                                <div className="col-span-6 sm:col-span-3 mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL</label>
                                    <input onChange={handleURLInput} type="text" className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full border p-2 rounded-md focus:outline-none sm:text-sm"/>
                                    {validationURL && <span className="text-red-700 text-sm mt-2">{validationURL}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Short URL</label>
                                        {linkKeyLoad ?
                                            <label className="text-xs">Generating....</label>
                                            :
                                            <label className="text-xs flex items-center hover:font-bold hover:cursor-pointer" onClick={generateLinkKey}>
                                                <span className="mr-2"><svg className="h-3 w-3" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            fill="none"
                                                                            shapeRendering="geometricPrecision"><path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"></path></svg></span>
                                                <span>Randomize Link</span>
                                            </label>
                                        }
                                    </div>

                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                            gum.lk/
                                        </span>
                                        <input value={linkKey} onChange={(e) => setLinkKey(e.target.value)} type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" />

                                    </div>
                                    {validationKey && <span className="text-red-700 text-sm mt-2">{validationKey}</span>}
                                </div>
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
                                        <input value={utm} onChange={(e) => setUtm(e.target.checked)} type="checkbox" id="AcceptConditions" className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"/>
                                        <span className="absolute inset-y-0 start-0 z-10 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-3 peer-checked:text-green-600 peer-checked:bg-green-500">
                                        </span>
                                        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-300"></span>
                                    </label>
                                </div>
                                {utm && <UtmCard appendURLwithUTM={appendURLwithUTM} />}



                            </div>









                            <div className="flex justify-between mt-5">
                                <form onSubmit={handleSubmit}>
                                    {loadingSubmit && <button className="bg-gray-400 text-white px-5 py-2 text-sm rounded-md" disabled={true}>Saving link...</button>}
                                    {!loadingSubmit && <button className="bg-black text-white px-5 py-2 text-sm rounded-md">Create Link</button>}

                                </form>
                                <button className="border border-gray-600 px-5 py-2 text-sm rounded-md" disabled={loadingSubmit}  onClick={createLinkModal}>Cancel</button>

                            </div>
                        </div>
                        <div className="">
                            {metaTags &&
                                <div className="">
                                    {metaTags.image ? <img src={metaTags.image} className="w-full rounded-2xl h-52" /> : <div className="w-full h-52 bg-gray-100 flex justify-center items-center rounded-2xl text-gray-400">Enter link for preview</div> }

                                    <div className="mt-3">
                                        <span className="text-sm">{metaTags.domainName ? metaTags.domainName : <div className="bg-gray-100 py-2 rounded-full mb-2"></div>}</span>
                                        <h2 className="font-bold">{metaTags.title ? metaTags.title : <div className="bg-gray-100 py-2 rounded-full mb-2"></div>}</h2>
                                        <p className="text-xs">{truncatedDescription ? truncatedDescription : <div className="bg-gray-100 py-2 rounded-full"></div>}</p>
                                    </div>

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}