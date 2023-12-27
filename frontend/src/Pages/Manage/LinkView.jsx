import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";

import { Card, BarChart } from "@tremor/react";

export default function LinkView(){
    const {linkkey} = useParams();

    const [linkDetails, setLinkDetails] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingData, setLoadingData] = useState(false);

    const [clickGraph, setClickGraph] = useState([]);


    const valueFormatter = (number) => `${new Intl.NumberFormat("us").format(number).toString()}`;


    useEffect( () => {
        getLink();
        getPastHour();
        
    }, [] );

    const getPastHour = async () => {
      setLoadingData(true)
      try{
        const response = await axiosInstance.get(`link/analytics/${linkkey}/lasthour`)
        setClickGraph(response.data.data)
        setLoadingData(false)
        
      } catch(error){
        console.log(error)
      }

    }

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

    const handleGraphDropdown = async (e) => {
      setLoadingData(true)
      const option = e.target.value
      const response = await axiosInstance.get(`link/analytics/${linkkey}/${option}`)
      setClickGraph(response.data.data);
      setLoadingData(false);
    }

    return(
        <>
            {loadingPage ? (<LazySpinner />) : (
                <>
                    

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

                    <Card>
                      {loadingData ? <div className='h-48 flex justify-center items-center'>Loading...</div> : (
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

                </>
            )}

        </>
    )
}