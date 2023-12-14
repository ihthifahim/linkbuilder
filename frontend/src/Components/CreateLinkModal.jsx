import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../utils/axiosConfig";

export default function CreateLinkModal({createLinkModal, linkSaved}){
    const navigate = useNavigate()
    const [metaTags, setMetaTags] = useState([]);

    const [destinationURL, setDestinationURL] = useState("");
    const [isValid, setIsValid] = useState(true);

    const [linkKey, setLinkKey] = useState("");
    const [linkKeyLoad, setLinkKeyLoad] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [validationURL, setValidationURL] = useState([])

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }


    useEffect( () => {

    }, [linkKey] );

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
        try{
            const formData = {
                url: destinationURL
            }

            if(isValid){
                const response = await axiosInstance.post('link/fetch-preview', formData)
                setMetaTags(response.data)
                generateLinkKey();
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
            await axiosInstance.get('link/get-link-key').then((res) => {

                setLinkKey(res.data);
                setLinkKeyLoad(false)

            })
        } catch(error){
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }

    }

    const handleSubmit = async (e) => {
        setLoadingSubmit(true)
        e.preventDefault()
        try{
            if(destinationURL !== "" && linkKey !== ""){
                const token = localStorage.getItem('token')
                const formData = {
                    token,
                    link_key: linkKey,
                    destinationURL,
                    page_title: metaTags.title,
                    page_description: metaTags.description,
                    page_image: metaTags.image,
                    page_favicon: metaTags.favicon,
                }
                const response = await axiosInstance.post('link/save', formData);
                console.log(response)
                if(response.data.message === "link saved"){
                    setLoadingSubmit(false);
                    setLinkKey("");
                    setDestinationURL("");
                    setMetaTags([]);
                    linkSaved();

                }
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
                                                <span className="mr-2"><svg className="h-3 w-3" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision"><path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"></path></svg></span>
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
                                </div>
                            </div>
                            <div className="flex justify-between mt-10">
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