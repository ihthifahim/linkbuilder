import React from 'react'

export default function UtmCard({appendURLwithUTM}){
    return (
        <>
        <div className="w-full py-5">

            <div className="flex mb-3">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">UTM Source</span>
                <input placeholder="facebook, google" onChange={(e) => appendURLwithUTM('utm_source', e.target.value)} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2" />
            </div>
            <div className="flex mb-3">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">UTM Medium</span>
                <input placeholder="cpc, banner, email" onChange={(e) => appendURLwithUTM('utm_medium', e.target.value)} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2" />
            </div>
            <div className="flex mb-3">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">UTM Campaign</span>
                <input placeholder="spring_sale" onChange={(e) => appendURLwithUTM('utm_campaign', e.target.value)} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2" />
            </div>
            <div className="flex mb-3">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">UTM Term</span>
                <input placeholder="red_tshirt" onChange={(e) => appendURLwithUTM('utm_term', e.target.value)} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2" />
            </div>
            <div className="flex mb-3">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">UTM Content</span>
                <input placeholder="feed_post_1" onChange={(e) => appendURLwithUTM('utm_content', e.target.value)} type="text" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2" />
            </div>


        </div>

        </>
    )
}