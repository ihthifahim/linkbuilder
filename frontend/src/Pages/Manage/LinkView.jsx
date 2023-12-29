import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";

import { Card, BarChart } from "@tremor/react";
import CountryBarList from './Links/Analytics/CountryBarList';

export default function LinkView(){
    const {linkkey} = useParams();
    const history = useNavigate();

    const [linkDetails, setLinkDetails] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false)

    const [loadingData, setLoadingData] = useState(false);
    const [clickGraph, setClickGraph] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);

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
        console.log(response.data.data)
        setCountryData(response.data.data.countryData);
        
        const formattedTotalClicks = response.data.data.totalClicks.totalClicks.toLocaleString();
        setTotalClicks(formattedTotalClicks);

        setLoadingData(false)
        
        
      } catch(error){
        console.log(error)
      }

  }

    const handleGraphDropdown = async (e) => {
      setLoadingData(true)
      const option = e.target.value
      const response = await axiosInstance.get(`link/analytics/${linkkey}/${option}`)
      console.log(response.data.data)
      setClickGraph(response.data.data.clicksData);
      setCountryData(response.data.data.countryData);
      
      const formattedTotalClicks = response.data.data.totalClicks.totalClicks.toLocaleString();
      setTotalClicks(formattedTotalClicks);
      setLoadingData(false);
  }

    return(
        <>
            {loadingPage ? (<LazySpinner />) : (
                <div className='w-full md:w-3/4 xl:w-2/4 mx-auto'>
                    

                    <div className='flex justify-between items-center'>
                      <div className="py-5">
                          <h2 className="font-bold text-2xl">{`${linkDetails.domain}/${linkDetails.link_key}`}</h2>
                      </div>
                      <div>
                        <select className='border px-3 py-2 rounded-lg hover:outline-none' onChange={(e) => handleGraphDropdown(e)}>
                          <option value="lasthour">Last hour</option>
                          <option value="past24hours">Past 24 hours</option>
                          <option value="last30Days">Past 30 days</option>
                          <option value="alltime">All time</option>
                        </select>
                      </div>
                    </div>

                    <Card className=''>
                      <div>
                        <h2 className='font-bold text-3xl'>{totalClicks}</h2>
                        <p className='text-sm'>Total Clicks</p>
                      </div>
                        {loadingData ? <div className='h-72 flex justify-center items-center'>Loading...</div> : (
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

                    <div className='grid grid-cols-2 gap-6 mt-6'>
                      <CountryBarList countryData={countryData} />
                    </div>

                    

                </div>
            )}

        </>
    )
}