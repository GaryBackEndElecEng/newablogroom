import React from 'react';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { blogType, userType } from '@/components/editor/Types';
import { redirect } from 'next/navigation';
import Index from '../index';
import { Metadata, ResolvingMetadata } from 'next';
import { imageLoader } from '@/components/common/tsFunctions';
import { genKeywords, retMetadata } from '@/app/post/[id]/page';
import { awsImage } from '@/lib/awsFunctions';

type Props = {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined },
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const id = Number(params.id)
    const singleBlog = await genMetadata({ id, parent });
    return singleBlog;
    //GENERATES AVAILABLE IDS FOR SINGLE PULL
}


export default async function page({ params }: Props) {
    const id = Number(params.id);
    const blog = await getBlog({ id });
    if (blog) {
        const user = await getUser({ user_id: blog.user_id });
        const isUser = user && user.showinfo ? user : null;
        return (
            <Index blog={blog} user={isUser} />
        )
    } else {
        redirect(`/blog/${id}`);
    }
};


async function getBlog(item: { id: number }): Promise<blogType | null> {
    const { id } = item;
    if (!id) return null;
    let blog: blogType | null = null;
    try {
        blog = await prisma.blog.findUnique({
            where: { id: id },
            include: {
                selectors: {
                    include: {
                        colAttr: true,
                        rows: {
                            include: {
                                cols: {
                                    include: {
                                        elements: true
                                    }
                                }
                            }
                        }
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
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
    } finally {
        await prisma.$disconnect();
        return blog;
    }
}
async function getUser(item: { user_id: string }) {
    const { user_id } = item;
    if (!user_id) return null;
    let user: userType | null = null;
    try {
        user = await prisma.user.findUnique({
            where: { id: user_id },
            select: {
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                username: true
            }
        }) as unknown as userType;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        await prisma.$disconnect();
        return user;
    }
}
export async function genMetadata(item: { id: number, parent: ResolvingMetadata }): Promise<Metadata> {
    const { id, parent } = item;
    const par = (await parent);
    const url = (par && par.metadataBase && par.metadataBase.origin) ? par.metadataBase.origin : "www.ablogroom.com";
    const blog = await getBlog({ id: id });
    // const image = imageLoader({ src: img, width: 300, quality: 75 });
    const image = blog && blog.imgKey ? await awsImage(blog.imgKey) : "/images/gb_logo.png";
    const title = blog && blog.title ? blog.title as string : "Ablogroom blogs";
    const keywds = blog && blog.desc ? await genKeywords({ content: blog.desc, title }) : [];
    const user = blog ? await getUser({ user_id: blog.user_id as string }) : null;
    const authors = user ? [{ name: user.name as string, url }] : undefined;
    if (user && user.name) {
        keywds.push(user.name)
    };
    return await retMetadata({ title, keywords: keywds, images: [{ url: image, width: 300, height: 300 }], url, authors });

}
