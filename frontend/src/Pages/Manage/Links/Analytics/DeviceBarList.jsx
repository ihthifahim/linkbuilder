import React, { useState, useEffect } from 'react';
import { BarList, Card, Title, Text } from "@tremor/react";

import LazySpinner from "../../../../Components/LazySpinner";

export default function RefererBarList({deviceData, loadingData}){
    if (deviceData.length === 0) {
        return (
            <Card className="max-w-lg">
                <Title>Device</Title>
                <div className='h-[200px] max-w-full flex justify-center items-center'>
                <Text>No data available</Text>
                </div>
                
            </Card>
        );
    }

    const data = deviceData.map((entry) => {
        return {
            name: entry.device, 
            value: entry.count, 
        };
    });

    return(
        <>
        <Card className="max-w-lg py-3 px-1">
            <Title className='px-3'>Device</Title>
            {loadingData ? <div className='h-72 flex justify-center items-center'><LazySpinner /></div> : (
                <BarList data={data} color="purple" className="mt-2 overflow-x-hidden h-[200px] px-2" />
            )}
            
        </Card>
        </>
    )
}