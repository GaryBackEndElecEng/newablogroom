"use client";

import React from 'react';
import ErrorClass from './errorClass';
import Meta from '@/components/meta/meta';


export default function Index(siteUrls: { siteUrls: string[] }) {
    const errRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && errRef.current) {
            const doc_ = document.querySelector("div#error_page") as HTMLElement;
            if (!doc_) return;
            const url = new URL(window.location.href)
            const error_ = new ErrorClass();
            const meta = new Meta();
            meta.params.map(item => {
                if (item) {
                    const param = url.searchParams.get(item);
                    if (param) {
                        error_._params.push({ item, param })
                    }
                }
            });
            error_.main({ parent: doc_, urls: siteUrls.siteUrls });

        }
    }, [siteUrls.siteUrls]);
    return (
        <div id="error_page" ref={errRef}></div>
    )
}
