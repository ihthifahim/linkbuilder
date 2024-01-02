'use client'
import React, {useState, useEffect, useRef} from 'react'

export default function UtmBuilderComponent() {
    const textareaRef = useRef(null);
    const [utmTags, setUtmTags] = useState({
        destinationurl: '',
        Id: '',
        Source: '',
        Medium: '',
        Name: '',
        Term: '',
        Content: ''
    });
    const [utmUrl, setUtmUrl] = useState("");

    useEffect(() => {
        generateURL();
    }, [utmTags])

    const generateURL = () => {
        const { destinationurl, Source, Medium, Name, Term, Content } = utmTags;
        if(destinationurl && Source && Medium){
            const utmParameters = [
                Source && `utm_source=${Source}`,
                Medium && `utm_medium=${Medium}`,
                Name && `utm_campaign=${Name}`,
                Term && `utm_term=${Term}`,
                Content && `utm_content=${Content}`,
            ];
            const generatedUtmUrl = `${destinationurl}?${utmParameters.filter(Boolean).join('&')}`;
            setUtmUrl(generatedUtmUrl);
        } 
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUtmTags((prevTags) => ({
          ...prevTags,
          [name]: value,
        }));
    };

    const handleCopyURL = () => {
        if(textareaRef.current){
            textareaRef.current.select();
            document.execCommand('copy');
        }
    }


 return(
    <>
    
    <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/6 mx-auto">
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Destination URL </label>
                <input type="text" onChange={handleInputChange} name="destinationurl" placeholder="https://www.gumly.co" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign ID </label>
                <input type="text" onChange={handleInputChange}  name="Id" placeholder="Ads campaing ID" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign Source* </label>
                <input type="text" onChange={handleInputChange} name="Source" placeholder="eg. Facebook, Google, Newsletter" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign Medium* </label>
                <input type="text" onChange={handleInputChange} name="Medium" placeholder="eg. email, banner, cpc" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign Name </label>
                <input type="text" onChange={handleInputChange} name="Name" placeholder="eg. Summer sale, Winter sale, Always On" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign Term </label>
                <input type="text" onChange={handleInputChange} name="Term" placeholder="Paid keywords" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>
            <div className="mb-5">
                <label class="block text-xs font-medium text-gray-200"> Campaign Content </label>
                <input type="text" onChange={handleInputChange} name="Content" placeholder="Differentiate your ads by defining your content" class="mt-1 w-full rounded-md bg-gray-900 text-white outline-none border-gray-200 shadow-sm sm:text-sm px-2 py-3" />
            </div>

            <div className='mt-10'>
                <label class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600" >
                    <span class="text-lg font-medium text-white "> Generated UTM Url </span>
                    <textarea disabled={true} ref={textareaRef} style={{ height: "auto", minHeight: "80px" }}  placeholder="Please fill Destination URL, Campaign Source and Campaign Medium to generate your URL" class="no-wrap mt-1 w-full border-none disabled:bg-gray-900 text-white px-2 py-4 overflow-hidden rounded-lg focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" defaultValue={utmUrl}></textarea>
                    <button onClick={handleCopyURL} className='text-xs bg-purple-500 px-3 py-2 rounded-lg mt-1 mb-4 text-white'>Copy URL</button>
                </label>
                
            </div>
    </div>
    </>
 )
}