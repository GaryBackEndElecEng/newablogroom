import React from 'react';
import type { Metadata } from 'next';
// import Meta from "@/components/meta/meta";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "terms of service",
        template: `%s | policy`,

    },
    description: "terms of service for ablogroom.com",
    keywords: ["custom charts", "realtime climate change", "make your own graph", "helping you connect", "free Graph making"],

    alternates: {
        canonical: "/termsOfService",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "terms of service",
        description: 'terms of service for www.ablogroom.com',
        url: "/termsOfService",
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
export default function termsOfServicelayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="termsOfServiceLayout mx-auto d-flex w-100 p-0 flex-column">
            {children}
        </div>
    )
}