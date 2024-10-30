"use server";//added
import React from 'react';
import Index from "@/components/blog/Index";
import type { ResolvingMetadata, Metadata } from "next";
// import Meta from '@/components/meta/meta';
import { PrismaClient } from "@prisma/client"
import { blogType } from '@/components/editor/Types';

// const meta_ = new Meta();
const prisma = new PrismaClient();
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

export default async function page({ params }: { params: { id: string } }) {
    const id = Number(params.id as string);
    const style: { [key: string]: string } = { minHeight: "100vh", height: "100%" };

    return (
        <div style={style} className="isLocal">
            <Index id={id} />
        </div>
    )

}

export async function genMetadata(item: { id: number, parent: ResolvingMetadata }): Promise<Metadata> {
    const { id, parent } = item;
    const par = (await parent);
    const blog = await prisma.blog.findUnique({
        where: { id }
    }) as blogType;
    const title = blog && blog.title ? blog.title as string : "Ablogroom blogs";
    const keywds = blog && blog.desc ? await genKeywords({ desc: blog.desc, title }) : [];
    const url = (par && par.metadataBase && par.metadataBase.origin) ? par.metadataBase.origin : "www.ablogroom.com";
    const user = blog ? await prisma.user.findUnique({
        where: { id: blog.user_id }
    }) : null;
    const authors = user ? [{ name: user.name as string, url }] : undefined
    await prisma.$disconnect();
    return await retMetadata({ title, keywords: keywds, images: undefined, url, authors });

}

export async function retMetadata(item: { title: string | undefined, keywords: string[] | undefined, images: { url: string, width: number, height: number }[] | undefined, url: string | undefined, authors: { name: string, url: string }[] | undefined }): Promise<Metadata> {
    const { title, keywords, images, url, authors } = item;
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
            default: title ? title : "ablogroom blog",
            template: `%s | ${title ? title : "ablogroom blog"}`,

        },

        description: ' blog page:Generated by www.masterconnect.ca,Free Blog Creation for you. It provides templates that the user can use to become an effective blogger.',
        generator: "ablogroom using Next.js",
        referrer: "origin-when-cross-origin",
        keywords: keywords ? keywords.concat(initKeywords) : initKeywords,
        authors: authors ? authors.concat(initAuthors) : initAuthors,
        creator: "Gary Wallace",
        publisher: "ablogrrom",
        formatDetection: {
            email: true,
            address: false,
            telephone: true
        },
        openGraph: {
            title: "ablogroom",
            description: 'Generated by www.masterconnect.ca,tools for you',
            url: url ? url : "www.ablogroom.com",
            siteName: "ablogroom",
            images: images ? images.concat(initImgs) : initImgs,
        },
    }
    return new Promise((resolve) => {
        resolve(metaReturn)
    }) as Promise<Metadata>;
}
export async function genKeywords(item: { desc: string, title: string }): Promise<string[]> {
    const { desc, title } = item;
    const words_: string[] = [title];
    const words = desc.split(" ");
    let i = 3;
    words.map((word, index) => {
        if (index > i && word.length > 2) {
            i = index - 3;
            const section = words.slice(i, index).join(" ");
            words_.push(section)
            i = index + 3;
        }
    });
    return new Promise(resolve => { resolve(words_) });
}





