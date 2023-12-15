import React from 'react';

export default function Test(){
    return(
        <>


            <div
                role="dialog"
                id="radix-:r5g:"
                aria-describedby="radix-:r5i:"
                aria-labelledby="radix-:r5h:"
                data-state="open"
                className="animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full overflow-hidden border border-gray-200 bg-white p-0 shadow-xl md:rounded-2xl max-w-screen-lg"
                tabIndex={-1}
                style={{ pointerEvents: "auto" }}
            >
                <div className="scrollbar-hide grid max-h-[90vh] w-full divide-x divide-gray-100 overflow-auto md:grid-cols-2 md:overflow-hidden">
                    <button className="group absolute right-0 top-0 z-20 m-3 hidden rounded-full p-2 text-gray-500 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200 md:block">
                        <svg
                            fill="none"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width={14}
                            height={14}
                            className="h-5 w-5"
                        >
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="scrollbar-hide rounded-l-2xl md:max-h-[90vh] md:overflow-auto">
                        <div className="z-10 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 pb-8 pt-8 transition-all md:sticky md:top-0 md:px-16">
                            <img
                                alt="Logo"
                                loading="lazy"
                                width={20}
                                height={20}
                                decoding="async"
                                data-nimg={1}
                                className="blur-0 h-10 w-10 rounded-full"
                                src="https://www.google.com/s2/favicons?sz=64&domain_url=alphaleteathletics.ca"
                                style={{ color: "transparent" }}
                            />
                            <h3 className="max-w-sm truncate text-lg font-medium">
                                Create a new link
                            </h3>
                        </div>
                        <form className="grid gap-6 bg-gray-50 pt-8">
                            <div className="grid gap-6 px-4 md:px-16">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="url-78"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Destination URL
                                        </label>
                                    </div>
                                    <div className="relative mt-1 flex rounded-md shadow-sm">
                                        <input
                                            id="url-78"
                                            required=""
                                            placeholder="https://dub.co/help/article/what-is-dub"
                                            autoComplete="off"
                                            className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md focus:outline-none sm:text-sm"
                                            aria-invalid="true"
                                            type="url"
                                            defaultValue="https://alphaleteathletics.ca/"
                                            name="url"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="key-78"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Short Link
                                        </label>
                                        <button
                                            className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                                            type="button"
                                        >
                                            <svg
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                width={24}
                                                height={24}
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                shapeRendering="geometricPrecision"
                                            >
                                                <path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z" />
                                            </svg>
                                            <p>Randomize</p>
                                        </button>
                                    </div>
                                    <div className="relative mt-1 flex rounded-md shadow-sm">
                                        <select className=" w-40 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-0">
                                            <option value="dub.sh">dub.sh</option>
                                            <option value="chatg.pt">chatg.pt</option>
                                            <option value="amzn.id">amzn.id</option>
                                            <option value="spti.fi">spti.fi</option>
                                        </select>
                                        <input
                                            id="key-78"
                                            required=""
                                            pattern="[\p{L}\p{N}\p{Pd}\/]+"
                                            autoComplete="off"
                                            className="block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                            placeholder="github"
                                            aria-invalid="true"
                                            aria-describedby="key-error"
                                            type="text"
                                            defaultValue="9pKM2x8"
                                            name="key"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative pb-3 pt-5">
                                <div
                                    className="absolute inset-0 flex items-center px-4 md:px-16"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
            <span className="bg-gray-50 px-2 text-sm text-gray-500">
              Optional
            </span>
                                </div>
                            </div>
                            <div className="grid gap-5 px-4 md:px-16">
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">Comments</h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative grid gap-5 border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Custom Social Media Cards
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                UTM Builder
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="true"
                                            data-state="checked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="checked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                            defaultChecked=""
                                        />
                                    </div>
                                    <div className="mt-3 grid gap-2" style={{ opacity: 1 }}>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  Referral (ref)
                </span>
                                            <input
                                                id="ref"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="twitter, facebook"
                                                type="text"
                                                defaultValue=""
                                                name="ref"
                                            />
                                        </div>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  UTM Source
                </span>
                                            <input
                                                id="utm_source"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="twitter, facebook"
                                                type="text"
                                                defaultValue=""
                                                name="utm_source"
                                            />
                                        </div>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  UTM Medium
                </span>
                                            <input
                                                id="utm_medium"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="social, email"
                                                type="text"
                                                defaultValue=""
                                                name="utm_medium"
                                            />
                                        </div>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  UTM Campaign
                </span>
                                            <input
                                                id="utm_campaign"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="summer_sale"
                                                type="text"
                                                defaultValue=""
                                                name="utm_campaign"
                                            />
                                        </div>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  UTM Term
                </span>
                                            <input
                                                id="utm_term"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="blue_shoes"
                                                type="text"
                                                defaultValue=""
                                                name="utm_term"
                                            />
                                        </div>
                                        <div className="relative mt-1 flex rounded-md shadow-sm">
                <span className="flex w-60 items-center justify-center whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  UTM Content
                </span>
                                            <input
                                                id="utm_content"
                                                className=" block w-full rounded-r-md border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                placeholder="logolink"
                                                type="text"
                                                defaultValue=""
                                                name="utm_content"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Link Cloaking
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <div
                                            className="md:inline-flex radix-state-checked:bg-gray-300 relative inline-flex h-4 w-8 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-gray-200"
                                            data-state="closed"
                                        >
                                            <div className="h-3 w-3 transform rounded-full bg-white shadow-lg" />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Password Protection
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Expiration Date
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                iOS Targeting
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Android Targeting
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked="false"
                                            data-state="unchecked"
                                            value="on"
                                            className="radix-state-checked:bg-blue-500 radix-state-unchecked:bg-gray-200 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                                        >
                <span
                    data-state="unchecked"
                    className="radix-state-checked:undefined radix-state-unchecked:translate-x-0 pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
                                        </button>
                                        <input
                                            aria-hidden="true"
                                            tabIndex={-1}
                                            type="checkbox"
                                            defaultValue="on"
                                            name="switch"
                                            style={{
                                                transform: "translateX(-100%)",
                                                position: "absolute",
                                                pointerEvents: "none",
                                                opacity: 0,
                                                margin: 0,
                                                width: 32,
                                                height: 16
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="relative border-b border-gray-200 pb-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between space-x-2">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Geo Targeting
                                            </h2>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:inline-flex h-4 w-4 text-gray-500"
                                                data-state="closed"
                                            >
                                                <circle cx={12} cy={12} r={10} />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <path d="M12 17h.01" />
                                            </svg>
                                        </div>
                                        <div
                                            className="md:inline-flex radix-state-checked:bg-gray-300 relative inline-flex h-4 w-8 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-gray-200"
                                            data-state="closed"
                                        >
                                            <div className="h-3 w-3 transform rounded-full bg-white shadow-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)] z-10 bg-gray-50 px-4 py-8 transition-all md:sticky  md:bottom-0 md:px-16">
                                <button
                                    type="submit"
                                    className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-black bg-black text-white hover:bg-white hover:text-black"
                                >
                                    <p>Create link</p>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="scrollbar-hide rounded-r-2xl md:max-h-[90vh] md:overflow-auto">
                        <div>
                            <div className="z-10 flex items-center justify-center border-b border-gray-200 bg-white px-5 py-10 sm:sticky sm:top-0">
                                <h2 className="text-lg font-medium">Social Previews</h2>
                            </div>
                            <div className="grid gap-5 p-5">
                                <div>
                                    <div className="relative mb-2">
                                        <div
                                            className="absolute inset-0 flex items-center"
                                            aria-hidden="true"
                                        >
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <div className="flex items-center space-x-2 bg-white px-3">
                                                <div className="group">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 248 204"
                                                        className="group-hover:hidden h-4 w-4 text-[#1DA1F2]"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                                                        />
                                                    </svg>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 1668.56 1221.19"
                                                        className="hidden scale-150 group-hover:block h-4 w-4 text-[#1DA1F2]"
                                                    >
                                                        <g transform="translate(52.390088,-25.058597)">
                                                            <path
                                                                fill="currentColor"
                                                                d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-400">Twitter</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-md border border-gray-300">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0538/2658/4736/files/Alphalete_Website_Social_Sharing_Image-01_9b0ccf05-5d03-44d1-b4ba-726c1b0503a4.jpg?v=1632581997"
                                            alt="Preview"
                                            className="h-[250px] w-full border-b border-gray-300 object-cover"
                                        />
                                        <div className="grid gap-1 p-3">
                                            <p className="text-sm text-[#536471]">alphaleteathletics.ca</p>
                                            <h3 className="truncate text-sm text-[#0f1419]">
                                                Premium Workout Clothes &amp; Athleisure
                                            </h3>
                                            <p className="line-clamp-2 text-sm text-[#536471]">
                                                Experience the next level of comfort, style, and functionality
                                                with our premium athleisure collections designed for those who
                                                demand the best. Shop now!{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative mb-2">
                                        <div
                                            className="absolute inset-0 flex items-center"
                                            aria-hidden="true"
                                        >
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <div className="flex items-center space-x-2 bg-white px-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1365.12"
                                                    height="1365.12"
                                                    viewBox="0 0 14222 14222"
                                                    className="h-4 w-4"
                                                >
                                                    <circle cx={7111} cy={7112} r={7111} fill="#1977f3" />
                                                    <path
                                                        d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-400">Facebook</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-gray-300">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0538/2658/4736/files/Alphalete_Website_Social_Sharing_Image-01_9b0ccf05-5d03-44d1-b4ba-726c1b0503a4.jpg?v=1632581997"
                                            alt="Preview"
                                            className="h-[250px] w-full border-b border-gray-300 object-cover"
                                        />
                                        <div className="grid gap-1 bg-[#f2f3f5] p-3">
                                            <p className="text-[0.8rem] uppercase text-[#606770]">
                                                alphaleteathletics.ca
                                            </p>
                                            <h3 className="truncate font-semibold text-[#1d2129]">
                                                Premium Workout Clothes &amp; Athleisure
                                            </h3>
                                            <p className="line-clamp-2 text-sm text-[#606770]">
                                                Experience the next level of comfort, style, and functionality
                                                with our premium athleisure collections designed for those who
                                                demand the best. Shop now!{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative mb-2">
                                        <div
                                            className="absolute inset-0 flex items-center"
                                            aria-hidden="true"
                                        >
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <div className="flex items-center space-x-2 bg-white px-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        fill="#027ab5"
                                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                                    />
                                                </svg>
                                                <p className="text-sm text-gray-400">LinkedIn</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_3px_rgba(0,0,0,0.2)]">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0538/2658/4736/files/Alphalete_Website_Social_Sharing_Image-01_9b0ccf05-5d03-44d1-b4ba-726c1b0503a4.jpg?v=1632581997"
                                            alt="Preview"
                                            className="h-[250px] w-full border-b border-gray-300 object-cover"
                                        />
                                        <div className="grid gap-1 bg-white p-3">
                                            <h3 className="truncate font-semibold text-[#000000E6]">
                                                Premium Workout Clothes &amp; Athleisure
                                            </h3>
                                            <p className="text-xs text-[#00000099]">
                                                alphaleteathletics.ca
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}