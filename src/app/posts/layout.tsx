// "use server";//USE SERVER CAN ONLY EXPORT ASYNC FUNCTION
import React from 'react';
import styles from "@/components/posts/post.module.css";
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
                url: "/images/posts_192_192.png",
                width: 192,
                height: 192
            },
            {
                url: "https://www.ablogroom.com/images/thankYou.png",
                width: 600,
                height: 900
            },
            {
                url: "/images/posts_512_512.png",
                width: 512,
                height: 512
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
            {children}
        </div>
    )
}