import React, { useState, useEffect } from 'react';
import { BarList, Card, Title, Text } from "@tremor/react";

import LazySpinner from "../../../../Components/LazySpinner";

export default function RefererBarList({referrerData, loadingData}){
    if (referrerData.length === 0) {
        return (
            <Card className="max-w-lg">
                <Title>Referrer</Title>
                <div className='h-[200px] max-w-full flex justify-center items-center'>
                <Text>No data available</Text>
                </div>
                
            </Card>
        );
    }

    const data = referrerData.map((entry) => {
        return {
            name: entry.referer, 
            value: entry.count, 
            icon: () => (
                <img
                    alt={entry.name}
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${entry.referer}`}
                    className="w-4 h-4 mt-1 mr-1"
                />
            ),
        };
    });

    return(
        <>
        <Card className="max-w-lg py-3 px-1">
            <Title className='px-3'>Referrer</Title>
            {loadingData ? <div className='h-72 flex justify-center items-center'><LazySpinner /></div> : (
            <BarList data={data} color="purple" className="mt-2 overflow-x-hidden h-[200px] px-2" />
            )}
        </Card>
        </>
    )
}