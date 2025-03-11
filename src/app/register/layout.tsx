import React from 'react';
import type { Metadata } from 'next';


const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "register",
        template: `%s | register`,

    },
    description: "registration for ablogroom.com",
    keywords: ["free charts", "free blog Creation", "make your own graph", "Make a Blog", "best in Canada"],

    alternates: {
        canonical: "/register",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Register",
        description: 'registration for www.ablogroom.com',
        url: "/register",
        images: [
            {
                url: "/images/favicon-192x192.png",
                width: 192,
                height: 192
            },
            {
                url: "/images/favicon-512x512.png",
                width: 512,
                height: 512
            },
            {
                url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
                width: 600,
                height: 900
            },
        ],
    }
}
export default function registerlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="registerlayout mx-auto d-flex w-100 p-0 flex-column">
            {children}
        </div>
    )
}