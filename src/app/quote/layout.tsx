import React from 'react';
import type { Metadata } from 'next';
import style from "./quote.module.css";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;

export const metadata: Metadata = {
    title: {
        default: "Simple Quote",
        template: `%s | Simple Quote`,

    },
    description: "get a full-stack integrated quote",
    keywords: ["fullstack page", "website quote", "best integrated stack money can buy", "making a web page is easy, but integrating it is not!"],

    alternates: {
        canonical: "/quote",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Simple Quote",
        description: "making a web page is easy, but integrating it is not! here we supply you with a full integrated quote money can buy - we guarrantee!",
        url: "/quote",
        images: [
            {
                url: "/images/quote_350_250.png",
                width: 350,
                height: 250
            },
            {
                url: "/images/quote_600.png",
                width: 600,
                height: 600
            },
            {
                url: "/images/quote_large.png",
                width: 900,
                height: 600
            },
        ],
    }
}
export default function quotelayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div id="quote-layout" className={style.quoteLayout}>
            <div className={style.quoteLayoutInner}>
                {children}
            </div>
        </div>
    )
}