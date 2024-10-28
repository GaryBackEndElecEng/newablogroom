import React from 'react'
import Index from './Index'
import Meta from '@/components/meta/meta';

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;
export default async function error_() {
    const meta = new Meta();
    const getsitemap = await meta.genSitemapArray({ baseUrl: baseUrl })
    const siteUrls = getsitemap.map(site => (site.url));
    return (
        <div className="container-fluid mx-auto"><Index siteUrls={siteUrls} /> </div>
    )
}