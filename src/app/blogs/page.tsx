import React from 'react';
import Index from "@/components/blogs/Index";
import { blogType } from '@/components/editor/Types';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';

export default async function Page() {
    const blogs = await getBlogs();
    return (
        <div className="isLocal" style={{ minHeight: "110vh", width: "100%" }}>
            <Index blogs={blogs} />

        </div>
    )
}
export async function getBlogs() {
    let blogs: blogType[] = [];
    try {
        blogs = await prisma.blog.findMany({
            where: {
                show: true
            },
            select: {
                id: true,
                name: true,
                title: true,
                desc: true,
                img: true,
                attr: true,
                eleId: true,
                class: true,
                inner_html: true,
                imgKey: true,
                imgBgKey: true,
                user_id: true,
                rating: true,
                pageCounts: true,
                date: true,
                update: true
            }
        }) as unknown as blogType[];
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        return blogs;
    }
}





