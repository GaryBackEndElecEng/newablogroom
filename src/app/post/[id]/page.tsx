import { imageLoader } from '@/components/common/tsFunctions';
import { postType, userType } from '@/components/editor/Types';
import { getErrorMessage } from '@/lib/errorBoundaries';
import prisma from '@/prisma/prismaclient';
import { Metadata, ResolvingMetadata } from 'next';
// import React from 'react';
import Index from "@/components/postDetail/Index";
import { redirect } from 'next/navigation';


type Props = {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined },
}


export default async function page({ params }: Props) {
    const id = Number(params.id);
    const post = await getPost({ id });
    if (post) {
        const user = await getUser({ user_id: post.userId });
        return (
            <div className="container-fluid mx-auto">

                <Index post={post} user={user} />
            </div>
        )

    } else {
        redirect("/");
    }
}

export async function genMetadata(item: { id: number, parent: ResolvingMetadata }): Promise<Metadata> {
    const { id, parent } = item;
    const par = (await parent);
    const url = (par && par.metadataBase && par.metadataBase.origin) ? par.metadataBase.origin : "www.ablogroom.com";
    const post = await getPost({ id: id });
    const img = (post && post.image) ? post.image : "https://www.ablogroom.com/images/posts.png";
    const image = imageLoader({ src: img, width: 300, quality: 75 });
    const title = post && post.title ? post.title as string : "Ablogroom blogs";
    const keywds = post && post.content ? await genKeywords({ content: post.content, title }) : [];
    const user = post ? await getUser({ user_id: post.userId as string }) : null;
    const authors = user ? [{ name: user.name as string, url }] : undefined;
    if (user && user.name) {
        keywds.push(user.name)
    };
    await prisma.$disconnect();
    return await retMetadata({ title, keywords: keywds, images: [{ url: image, width: 300, height: 300 }], url, authors });

}

export async function retMetadata(item: { title: string | undefined, keywords: string[] | undefined, images: { url: string, width: number, height: number }[] | undefined, url: string | undefined, authors: { name: string, url: string }[] | undefined }): Promise<Metadata> {
    const { title, keywords, images, url, authors } = item;
    const initKeywords = ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"]
    const initImgs: { url: string, width: number, height: number }[] = [
        {
            url: "/images/posts.png",
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
export async function genKeywords(item: { content: string, title: string }): Promise<string[]> {
    const { content, title } = item;
    const words_: string[] = [];
    words_.push(title);
    const contSplit = content.split(" ")
    let i = 3;
    contSplit.map((word, index) => {
        if (index > i && word.length > 2) {
            i = index - 3;
            const section = contSplit.slice(i, index).join(" ");
            words_.push(section)
            i = index + 3;
        }
    });
    return new Promise(resolve => { resolve(words_) });
}
export async function getPost(item: { id: number }): Promise<postType | null> {
    const { id } = item;
    let post: postType | null = null;
    try {
        post = await prisma.post.findUnique({
            where: { id: id },
            select: {
                id: true,
                title: true,
                content: true,
                link: true,
                image: true,
                imageKey: true,
                published: true,
                date: true,
                userId: true,
                likes: true

            }
        }) as unknown as postType;

    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg);
    } finally {
        await prisma.$disconnect();
        return post;
    }
}
export async function getUser(item: { user_id: string }): Promise<userType | null> {
    const { user_id } = item;
    let user: userType | null = null;
    try {
        user = await prisma.user.findUnique({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                admin: true,
                username: true
            }
        }) as unknown as userType;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg);

    } finally {
        await prisma.$disconnect();
        return user;
    }
};