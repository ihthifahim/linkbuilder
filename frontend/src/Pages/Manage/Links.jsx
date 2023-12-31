import React, {useState, useEffect} from 'react'
import PageTitle from "../../PageTitle";

import CreateLinkModal from "../../Components/CreateLinkModal";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";
import LazySpinner from "../../Components/LazySpinner"; 

import LinkCard from "../../Components/LinkCard";
import {Link} from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import Test from "../../Components/Test";

export default function Links(){

    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [linkList, setLinkList] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [sortLinks, setSortLinks] = useState('CreatedAt');
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        getAllLinks()
    }, [currentPage, pageSize, sortLinks])

    const getAllLinks = async () => {
        setIsLoading(true);
        try{
            const response = await axiosInstance.get(`link/get-all-links?page=${currentPage}&pageSize=${pageSize}&sort=${sortLinks}`);
            setLinkList(response.data.links.rows)
            setTotalPages(response.data.pageCount)
        } catch (error){
            console.log({error})
        } finally {
            setIsLoading(false)
        }

    }

    // const handleSortLinks = (e) => {
    //     setSortLinks(e.target.value);
    //     getAllLinks();

    // }

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


            <div className='flex justify-end mb-4 mt-5'>
                <div>
                    <select onChange={(e) => setSortLinks(e.target.value)} className='px-3 py-2 rounded-lg text-sm'>
                        <option>Sort by</option>
                        <option value="CreatedAt">Created at</option>
                        <option value="TotalClicks">Total Clicks</option>
                        <option value="LastClick">Last Click</option>
                    </select>
                </div>
            </div>

            
            {isLoading ? <div className='flex justify-center items-center w-full h-32'><LazySpinner /></div> : 

            <div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* <div className="lg:col-span-4 scrollbar-hide px-5 py-5 sticky top-40 hidden max-h-[calc(100vh-150px)] self-start overflow-auto rounded-lg border border-gray-100 bg-white shadow lg:block">
                    <h2 className="font-bold">Filter links</h2>
                </div> */}
                
                    <div className="auto-rows-min  grid-cols-1 lg:col-span-12">
                        
                        {linkList.length === 0 ? (
                            <h2>No links found.</h2>
                        ) : (
                            linkList.map((link) => (
                                <LinkCard key={link.id} link={link} getAllLinks={getAllLinks} />
                            ))
                        )}
                    </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                    <div class="inline-flex justify-center gap-1">
                        <a href="#" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
                            <span class="sr-only">Prev Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                            </svg>
                        </a>

                        <div className='flex items-center justify-center h-8'>
                            <span className='block px-5 py-1 text-center bg-white rounded'>{currentPage} of {totalPages}</span>
                        </div>

                        <a href="#" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180" >
                            <span class="sr-only">Next Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                            </svg>
                        </a>
                    </div>
                    </div>

            </div>
            }

            {showCreateLinkModal && <CreateLinkModal createLinkModal={createLinkModal} linkSaved={linkSaved} />}
            {/*{showCreateLinkModal && <Test />}*/}
            {showSuccessAlert && <SuccessAlert  />}

        </div>
    )
}