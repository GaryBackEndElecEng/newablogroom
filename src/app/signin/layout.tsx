import React from 'react';
import type { Metadata } from 'next';
import styles from "./signin.module.css";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "signIn",
        template: `%s | signin`,

    },
    description: "signin for ablogroom.com",
    keywords: ["ablogroom signin", "sign in", "Best Blog Editor in Canada", "free blog Creation", "make your own graph", "Make a Blog", "best in Canada"],

    alternates: {
        canonical: "/signin",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "signin",
        description: 'signin for www.ablogroom.com',
        url: "/signin",
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
export default function signinlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}