import React from 'react';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { blogType, userType } from '@/components/editor/Types';
import { redirect } from 'next/navigation';
import Index from '../index';
import { Metadata, ResolvingMetadata } from 'next';
import { genKeywords, retMetadata } from '@/app/post/[id]/page';
import { awsImage } from '@/lib/awsFunctions';

const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL : "http:///localhost:3000";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;
    const id = Number(params.id)
    const singleBlog = await genMetadata({ id, parent });
    return singleBlog;
    //GENERATES AVAILABLE IDS FOR SINGLE PULL
}


export default async function page(props: Props) {
    const params = await props.params;
    const id = Number(params.id);
    const blog = await getBlog({ id });
    if (blog) {
        const user = await getUser({ user_id: blog.user_id });
        const isUser = user?.showinfo ? user : null;
        return (
            <Index blog={blog} owner={isUser} />
        )
    } else {
        redirect(`/blogs`);
    }
};


async function getBlog(item: { id: number }): Promise<blogType | null> {
    const { id } = item;
    if (!id) return null;

    try {
        const blog = await prisma.blog.findUnique({
            where: { id: id, show: true },
            include: {
                selectors: {
                    include: {
                        colAttr: true,
                    }
                },
                messages: false,
                elements: true,
                codes: {
                    include: {
                        linecode: true
                    }
                },
                pageCounts: true,
                charts: true
            }
        }) as unknown as blogType;
        return blog;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
        await prisma.$disconnect();
        return null;
    }
};


async function getUser(item: { user_id: string }) {
    const { user_id } = item;
    if (!user_id) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id, showinfo: true },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                username: true
            }
        }) as unknown as userType;
        return user
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    };
};


export async function genMetadata(item: { id: number, parent: ResolvingMetadata }): Promise<Metadata> {
    const { id, parent } = item;
    const par = (await parent);
    const url = par?.metadataBase?.origin || baseUrl || "www.ablogroom.com";
    const blog = await getBlog({ id: id });
    const image = blog?.imgKey ? await awsImage(blog.imgKey) : "/images/gb_logo.png";
    const title = blog?.title ? blog.title as string : "Ablogroom blogs";
    const keywds = blog?.desc ? await genKeywords({ content: blog.desc, title }) : [];
    const user = blog ? await getUser({ user_id: blog.user_id as string }) : null;
    const authors = user ? [{ name: user.name as string, url }] : undefined;
    if (user?.name) {
        keywds.push(user.name)
    };
    return await retMetadata({ title, keywords: keywds, images: [{ url: image, width: 300, height: 300 }], url, authors });

}
