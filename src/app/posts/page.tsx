"use server";
import React from 'react'
import Index from "@/components/posts/Index";
import styles from "@/components/posts/post.module.css";
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { postType, userType } from '@/components/editor/Types';
import { getServerSession, Session } from 'next-auth';



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
