import React, {useEffect, useState} from 'react'
import axiosInstance from "../../utils/axiosConfig";

import { BarChart } from "@tremor/react";

export default function TrafficBar(){

    return(
        <>
            <Card className=''>
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
        </>
    )
}