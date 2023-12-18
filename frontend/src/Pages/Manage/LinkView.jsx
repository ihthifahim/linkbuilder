import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";

import { BarChart } from "@tremor/react";

export default function LinkView(){
    const {linkkey} = useParams();

    const [linkDetails, setLinkDetails] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false)

    const chartdata = [
        {
          name: "Amphibians",
          "Number of threatened species": 2488,
        },
        {
          name: "Birds",
          "Number of threatened species": 1445,
        },
        {
          name: "Crustaceans",
          "Number of threatened species": 743,
        },
        {
          name: "Ferns",
          "Number of threatened species": 281,
        },
        {
          name: "Arachnids",
          "Number of threatened species": 251,
        },
        {
          name: "Corals",
          "Number of threatened species": 232,
        },
        {
          name: "Algae",
          "Number of threatened species": 98,
        },
      ];

      const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;


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



    
    <BarChart className="mt-6" data={chartdata}
      categories={["Number of threatened species"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
    />

                </>
            )}

        </>
    )
}