import React, {useState} from 'react'
export default function LinkCopied(){
    return(
        <>
            <div className="fixed bottom-8 right-8 z-50 ">
                <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-start gap-4">
                    <span className="text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                        <div className="flex-1">
                            <strong className="block font-medium text-gray-900"> Link copied to clipboard </strong>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}