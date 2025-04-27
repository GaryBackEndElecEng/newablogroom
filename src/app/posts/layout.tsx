// "use server";//USE SERVER CAN ONLY EXPORT ASYNC FUNCTION
import React from 'react';
import styles from "./posts.module.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: "ablogroom Blogs",
        template: `%s | ablogroom Blog`
    },
    description: 'Curious, wondering and intriquing posts to drive self-awareness.',
    generator: "ablogroom using Next.js",
    referrer: "origin-when-cross-origin",
    keywords: ["A Post for You", "Wondering posts", "How do I Post", "riddle posts", " intelligent posts", " Posts for you", "Gary's Blogs"],
    authors: [{ name: "Gary Wallace", url: "https://www.ablogroom.com" }],

    openGraph: {
        title: "ablogroom",
        description: 'Interesting && insightful Posts for you:www.masterconnect.ca,',
        url: "https://www.ablogroom.com",
        siteName: "ablogroom",
        images: [
            {
                url: "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/gb_logo_600.png",
                width: 600,
                height: 600
            },
            {
                url: "https://www.ablogroom.com/images/thankYou.png",
                width: 600,
                height: 900
            },


        ],
    },

};


export default function blogslayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.postsLayout}>
            <div className={styles.postsLayoutInner}>
                {children}

            </div>
        </div>
    )
}