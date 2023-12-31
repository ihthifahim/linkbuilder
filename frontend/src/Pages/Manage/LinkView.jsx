import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";
import EditLink from './Links/EditLink';

import { HiOutlineArrowSmallLeft, HiOutlinePencilSquare } from "react-icons/hi2";

import { Card, BarChart } from "@tremor/react";
import CountryBarList from './Links/Analytics/CountryBarList';
import RefererBarList from './Links/Analytics/RefererBarList';
import DeviceBarList from './Links/Analytics/DeviceBarList';

export default function LinkView(){
    const {linkkey} = useParams();
    const history = useNavigate();

    const [linkDetails, setLinkDetails] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false)

    const [loadingData, setLoadingData] = useState(false);
    const [clickGraph, setClickGraph] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [referrerData, setReferrerData] = useState([]);
    const [deviceData, setDeviceData] = useState([])
    const [editLink, setEditLink] = useState(false);

    const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

    const convertTimeZone = (utcTime) => {
      const userTimeZone = localStorage.getItem('locale') || 'UTC';
      return new Date(utcTime).toLocaleString('en-us', { timeZone: userTimeZone});
    }
    
    useEffect( () => {
        getLink();
        
    }, [] );

    useEffect(() => {
      getPastHour();
    },[])

    const getLink = async () => {
        setLoadingPage(true)
        try{
            const response = await axiosInstance.get(`link/get-link?key=${linkkey}`);
            if(!response.data){
              history('/manage/links');
              return;
            }
            setLinkDetails(response.data)
            setLoadingPage(false)
        } catch(error){
            console.log(error)
        }
    }

  const getPastHour = async () => {

    setLoadingData(true)
    try{
      const response = await axiosInstance.get(`link/analytics/${linkkey}/lasthour`)
      setClickGraph(response.data.data.clicksData)
      setCountryData(response.data.data.countryData);
      setReferrerData(response.data.data.refererData);
      setDeviceData(response.data.data.deviceData);
      
      const formattedTotalClicks = response.data.data.totalClicks.totalClicks.toLocaleString();
      setTotalClicks(formattedTotalClicks);

      setLoadingData(false)
      
      
    } catch(error){
      console.log(error)
    }

  }

  const handleEdit = () => {
    setEditLink(!editLink);
  }


  const handleGraphDropdown = async (e) => {
    setLoadingData(true)
    const option = e.target.value
    const response = await axiosInstance.get(`link/analytics/${linkkey}/${option}`)

    setClickGraph(response.data.data.clicksData);
    setCountryData(response.data.data.countryData);
    setReferrerData(response.data.data.refererData);
    setDeviceData(response.data.data.deviceData);
    
    const formattedTotalClicks = response.data.data.totalClicks.totalClicks.toLocaleString();
    setTotalClicks(formattedTotalClicks);
    setLoadingData(false);
  }

    return(
        <>
            {editLink && <EditLink linkDetails={linkDetails} handleEdit={handleEdit} />}
            {loadingPage ? (<LazySpinner />) : (
                <div className='w-full md:w-3/4 xl:w-2/4 mx-auto'>
                    
                    <Link to="/manage/links" className='block rounded-lg px-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-24 flex items-center '>
                      <HiOutlineArrowSmallLeft /> <span className='ml-2 text-sm'>Go back</span>
                    </Link>

                    <div className='flex justify-between items-center'>
                      <div className="py-5">
                          <h2 className="font-bold text-2xl">{`${linkDetails.domain}/${linkDetails.link_key}`}</h2>
                          <p className='text-sm text-gray-400 mt-1'>Last Clicked: {convertTimeZone(linkDetails.last_click_date)}</p>
                          
                      </div>
                      <div className='flex justify-between items-center'>
                        <select className='border px-3 py-2 rounded-lg hover:outline-none' onChange={(e) => handleGraphDropdown(e)}>
                          <option value="lasthour">Last hour</option>
                          <option value="past24hours">Past 24 hours</option>
                          <option value="last30Days">Past 30 days</option>
                          <option value="alltime">All time</option>
                        </select>
                        
                        <button onClick={handleEdit} className='ml-5 text-xl p-2 bg-black text-white rounded-lg'><HiOutlinePencilSquare /></button>
                      </div>
                    </div>

                    <Card className=''>
                      <div>
                        <h2 className='font-bold text-3xl'>{totalClicks}</h2>
                        <p className='text-sm'>Total Clicks</p>
                      </div>
                        {loadingData ? <div className='h-72 flex justify-center items-center'><LazySpinner /></div> : (
                        <BarChart
                            className="mt-6"
                            data={clickGraph}
                            index="name"
                            categories={["Clicks"]}
                            colors={["violet"]}
                            
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                        />
                        )}
                    </Card>

                    <div className='grid grid-cols-1 md:grid-cols-2  gap-6 mt-6'>
                      <CountryBarList countryData={countryData} loadingData={loadingData} />
                      <RefererBarList referrerData={referrerData} loadingData={loadingData} />
                      <DeviceBarList deviceData={deviceData} loadingData={loadingData} />
                      
                    </div>

                    

                </div>
            )}

        </>
    )
}