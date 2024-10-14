import React from 'react'
import Index from './Index'
import Meta from '@/components/meta/meta';


export default async function error_() {
    const getsitemap = await Meta.genSitemapArray()
    const siteUrls = getsitemap.map(site => (site.url));
    return (
        <div className="container-fluid mx-auto"><Index siteUrls={siteUrls} /> </div>
    )
}