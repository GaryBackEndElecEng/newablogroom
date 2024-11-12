import React from 'react';
import type { Metadata } from 'next';
import style from "./profile.module.css";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "profile",
        template: `%s | profile`,

    },
    description: "profile ablogroom.com",
    keywords: ["profile page", "personal settings", "best in Canada"],

    alternates: {
        canonical: "/profile",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Profile",
        description: 'Profile for www.ablogroom.com',
        url: "/profile",
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
export default function registerlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={style.profileLayout}>
            {children}
        </div>
    )
}