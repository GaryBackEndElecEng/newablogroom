"use server";//USE SERVER CAN ONLY EXPORT ASYNC FUNCTION
import React from 'react';
import { PrismaClient } from "@prisma/client";
import type { ResolvingMetadata, Metadata } from 'next';
import { blogType, userType } from '@/components/editor/Types';
import { awsImage } from '@/lib/awsFunctions';
const prisma = new PrismaClient();


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const metaBlogs = await generate_meta({ parent });
    return metaBlogs;
}
export async function generate_meta(item: { parent: ResolvingMetadata }): Promise<Metadata> {
    const { parent } = item;
    const logo = "/images/gb_logo.png";
    const par = (await parent) ? (await parent) : undefined;
    const url = par && par.metadataBase && par.metadataBase.origin ? par.metadataBase.origin : "https://www.ablogroom.com";
    const blogs = await prisma.blog.findMany({ where: { show: true } }) as blogType[];
    const users = await prisma.user.findMany({ where: { showinfo: true } }) as userType[];
    await prisma.$disconnect();
    const titles: string[] = blogs.map(blog => (blog.title ? blog.title : "no title"));
    const authors = users.map(user => ({ name: user.name ? user.name : "blogger", url }));
    const imagesOnly = await Promise.all(blogs.map(async (blog) => (blog.imgKey ? await awsImage(blog.imgKey) : `${url}${logo}`)));
    const images = imagesOnly.map(img => {
        return {
            url: img,
            width: 600,
            height: 600
        }
    });
    return await retMetadata({ keywords: titles, images, url, authors })
};

export async function retMetadata(item: { keywords: string[] | undefined, images: { url: string, width: number, height: number }[] | undefined, url: string | undefined, authors: { name: string, url: string }[] | undefined }): Promise<Metadata> {
    const { keywords, images, url, authors } = item;
    const initKeywords = ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"]
    const initImgs: { url: string, width: number, height: number }[] = [
        {
            url: "/images/gb_logo.png",
            width: 600,
            height: 600
        },
        {
            url: "https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/masterUltils800_400.png",
            width: 800,
            height: 400
        },
    ];
    const initAuthors = [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }]

    const metaReturn: Metadata = {
        title: {
            default: "ablogroom Blogs",
            template: `%s | "ablogroom Blog"}`,

        },

        description: ' Free Blogs by ABLOGROOM -Blogs Creation by Bloggers for You. It provides templates that the user can use to become an effective blogger.',
        generator: "ablogroom using Next.js",
        referrer: "origin-when-cross-origin",
        keywords: keywords ? keywords.concat(initKeywords) : initKeywords,
        authors: authors ? authors.concat(initAuthors) : initAuthors,
        // colorScheme:"light",
        openGraph: {
            title: "ablogroom",
            description: 'Generated by www.masterconnect.ca,tools for you',
            url: url ? url : "www.ablogroom.com",
            siteName: "ablogroom",
            images: images ? images.concat(initImgs) : initImgs,
            locale: "en-CA",
            type: "website"

        },

    }
    return new Promise((resolve) => {
        resolve(metaReturn)
    }) as Promise<Metadata>;
}

export default async function bloglayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="blogslayout mx-auto d-flex w-100 p-0 flex-column">
            {children}
        </div>
    )
}