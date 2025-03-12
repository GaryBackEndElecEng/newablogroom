"use server";
import React from 'react'
import Index from "@/components/posts/Index";
import styles from "@/components/posts/post.module.css";
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { postType, userType } from '@/components/editor/Types';
import { Metadata, ResolvingMetadata } from 'next';
import { getServerSession, Session } from 'next-auth';

// type Props = {
//     params: Promise<{ id: string }>
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// };
// export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const posts = await getPosts();
//     const singleBlog = await genMetadata(parent, { posts });
//     return singleBlog;
//     //GENERATES AVAILABLE IDS FOR SINGLE PULL
// };


export default async function page() {
    const session = await getServerSession();
    const user = await getUser({ session })
    const posts = (await getPosts()) ? await getPosts() : [];
    const usersinfo = (await getUsersinfo()) ? await getUsersinfo() : [];
    return (
        <div className={styles.pageposts}>
            <Index posts={posts} usersinfo={usersinfo} user={user} />
        </div>
    )
};

export async function getUsersinfo(): Promise<userType[]> {
    let users: userType[] = [];
    try {
        users = await prisma.user.findMany({
            where: {
                showinfo: true
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                admin: true,
                username: true
            }
        }) as unknown as userType[];
        await prisma.$disconnect()
        return users;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as userType[];
    };
};

export async function getPosts(): Promise<postType[]> {
    let posts: postType[] = [];
    try {
        posts = await prisma.post.findMany({
            where: {
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                link: true,
                imageKey: true,
                sendReqKey: true,
                sendMsg: true,
                image: true,
                date: true,
                likes: true,
                userId: true
            }
        }) as unknown as postType[];
        return posts;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as postType[];
    };
};


export async function genMetadata(parent: ResolvingMetadata, { posts }: { posts: postType[] }): Promise<Metadata> {
    const par = await parent;
    let keywords: string[] = [];
    keywords = posts.map(post => (post.title));
    const contentArr = posts.toSorted((a, b) => { if (a.likes > b.likes) return -1; return 1 }).map(post => (post.content ? `${post.content.split(" ").slice(0, 10).join(" ")}...` : "ablogroom post")).slice(0, 4);
    keywords = keywords.concat(contentArr);
    const images = [{ url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/posts.png" }, { url: "https://www.ablogroom.com/images/posts.png" }]
    const desc = `Free Posts && Blogs by ABLOGROOM -Blogs Creation by Bloggers for You, such as:${contentArr.join(",")}`;
    const prevImages = images || par?.openGraph?.images
    const prevDesc = desc || par.openGraph?.description;
    const prevKeywords = keywords || par.keywords;
    return {
        title: {
            default: "ablogroom Posts",
            template: `%s | "ablogroom Posts"}`,

        },
        description: prevDesc,
        generator: "ablogroom using Next.js",
        referrer: "origin-when-cross-origin",
        keywords: prevKeywords,
        authors: [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }],
        openGraph: {
            title: "Ablogroom Posts",
            description: 'Generated by www.masterconnect.ca,tools for you',
            url: "https://www.ablogroom.com/posts",
            siteName: "ablogroom",
            images: prevImages,

        }

    }
};

async function getUser({ session }: { session: Session | null }) {
    const email = session?.user?.email || null;
    if (email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    password: false,
                    email: true,
                    name: true,
                    username: true,
                    image: true,
                    imgKey: true,
                    bio: true,
                    showinfo: true,
                    admin: true
                }
            }) as unknown as userType;
            if (user) {
                await prisma.$disconnect();
                return user
            }
            return null;
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            await prisma.$disconnect();
            return null;
        };
    };
    await prisma.$disconnect();
    return null
}
