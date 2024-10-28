import React from 'react';
import type { Metadata } from 'next';
// import Meta from "@/components/meta/meta";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "policy",
        template: `%s | policy`,

    },
    description: "policy for ablogroom.com",
    keywords: ["custom charts", "realtime climate change", "make your own graph", "helping you connect", "free Graph making"],

    alternates: {
        canonical: "/policy",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "policy",
        description: 'policy fro www.ablogroom.com',
        url: "/policy",
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
export default function policylayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto d-flex w-100 p-0 flex-column">
            {children}
        </div>
    )
}