import React, {useState} from "react";
import {Helmet} from "react-helmet";
export default function PageTitle({title}){


    return(
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title || "Link Builder"}</title>
            </Helmet>
        </>
    )
}