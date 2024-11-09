// "use server"; //EXPORTS ONLY ASYNC FUNCTIONS
import React from 'react';
// import type { Metadata, ResolvingMetadata } from 'next';
import styles from "@/components/posts/post.module.css";
import { PrismaClient } from "@prisma/client";
// import { postType, userType } from '@/components/editor/Types';
// import { awsImage } from '@/lib/awsFunctions';
// const prisma = new PrismaClient();

// export const metadata: Metadata = {
//     title: {
//         default: "ablogroom Posts",
//         template: `%s | "ablogroom Posts"}`,

//     },
//     description: ' Free Posts && Blogs by ABLOGROOM -Blogs Creation by Bloggers for You. It provides templates that the user can use to become an effective blogger.',
//     generator: "ablogroom using Next.js",
//     referrer: "origin-when-cross-origin",
//     keywords: ["MUST SEE!", "The Blog Room Posts, Free to use", "blogs/Posts for you", "web info", "free blog-posts", " The World is Your Oyster", " Create Your Own Blog", "Create a Post"],
//     authors: [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }],
//     openGraph: {
//         title: "ablogroom",
//         description: 'Generated by www.masterconnect.ca,tools for you',
//         url: "https://www.ablogroom.com",
//         siteName: "ablogroom",
//         images: [
//             {
//                 url: "/images/gb_logo.png",
//             },
//             {
//                 url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png",
//             },
//         ],

//     }

// }



export default async function postlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layoutposts}>
            {children}
        </div>
    )
}
