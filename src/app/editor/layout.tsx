import React from 'react';
import type { Metadata } from 'next';
// import Meta from "@/components/meta/meta";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "editor",
        template: `%s | editor`,

    },
    description: "create a Free blog or website",
    keywords: ["custom Blogs", "custom website", "Best Web Design Tool in Canada", "helping you connect", "Free for You"],

    alternates: {
        canonical: "/editor",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Editor",
        description: 'Customize your chart, free for all. It provides no-where-else tools to generate custom pages',
        url: "/Editor",
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
export default function chartlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-start mx-auto mb-4 mt-0 py-0">
            {children}
        </div>
    )
}