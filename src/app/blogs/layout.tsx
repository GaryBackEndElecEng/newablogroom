import React from 'react';
import type { Metadata } from 'next';
// export const metadata: Metadata = meta.metaBlogs();
// const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "blogs",
        template: `%s | blogs`,

    },
    description: "Comment page",
    keywords: ["comments and messages", "comments", "ask Us something", "helping you connect", " message board"],

    alternates: {
        canonical: "/blogs",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Blogs",
        description: 'blogs',
        url: "/blogs",
        images: [
            {
                url: "/images/gb_logo.png",
                width: 300,
                height: 300
            },
            {
                url: "/images/display/symetric.png",
                width: 400,
                height: 300
            },
            {
                url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
                width: 600,
                height: 900
            },
        ],
    }
}
export default function bloglayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="blogslayout mx-auto d-flex w-100 p-0 flex-column">
            {children}
        </div>
    )
}