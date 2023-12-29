import React, { useState, useEffect } from 'react';
import { BarList, Card, Title, Text } from "@tremor/react";


export default function CountryBarList({countryData}){

    if (countryData.length === 0) {
        return (
            <Card className="max-w-lg">
                <Title>Country</Title>
                <div className='h-[200px] max-w-full flex justify-center items-center'>
                <Text>No data available</Text>
                </div>
                
            </Card>
        );
    }


    const data = countryData.map((entry) => {
        
        return {
            name: entry.country, 
            value: entry.count, 
            icon: () => (
                <img
                    alt={entry.name}
                    src={`https://flag.vercel.app/m/${entry.country}.svg`}
                    className="w-5 h-3 mt-1 mr-1"
                />
            ),
        };
    });
    

    return (
        <>
        <Card className="max-w-lg py-3 px-1">
            <Title className='px-3'>Country</Title>
            <BarList data={data} color="purple" className="mt-2 overflow-x-hidden h-[200px] px-2" />
        </Card>
        </>
    )
}
