"use client";

import React from 'react';
import ErrorClass from './errorClass';
import Meta from '@/components/meta/meta';
import styles from "./error.module.css";

export default function Index({ blogIds, postIds }: { blogIds: { id: number }[], postIds: { id: number }[] }) {
    const errRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && errRef.current && countRef.current === 0) {
            if (blogIds && postIds) {

                const meta = new Meta();
                const url = new URL(window.location.href)
                meta.genSitemapArray({ baseUrl: window.location.origin, blogIds, postIds }).then(async (res) => {
                    if (res) {
                        const siteUrls = res.map(site => (site.url));
                        const doc_ = document.querySelector("div#error_page") as HTMLElement;
                        if (!doc_) return;
                        countRef.current++;
                        const error_ = new ErrorClass();
                        meta.params.map(item => {
                            if (item) {
                                const param = url.searchParams.get(item);
                                if (param) {
                                    error_._params.push({ item, param })
                                }
                            }
                        });
                        error_.main({ parent: doc_, urls: siteUrls, params: error_.params });
                    }
                });
            }

        }
    }, [blogIds, postIds]);
    return (
        <div className={styles.errorIndex} id="error_page" ref={errRef}></div>
    )
}
