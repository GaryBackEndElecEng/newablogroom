"use server";
import React from 'react'
import Index from './Index'
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';

export default async function error_() {
    const blogIds = await getBlogIds()
    const postIds = await getPostIds()
    return (
        <div className="isServer"><Index blogIds={blogIds} postIds={postIds} /> </div>
    )
};


async function getBlogIds(): Promise<{ id: number }[]> {
    try {
        const blogs = await prisma.blog.findMany({
            where: { show: true }
        });
        return blogs.map(bl => ({ id: bl.id }))
    } catch (error) {
        const msg = getErrorMessage(error)
        console.log(msg);
        return []
    }
}
async function getPostIds(): Promise<{ id: number }[]> {
    try {
        const posts = await prisma.post.findMany();
        return posts.map(bl => ({ id: bl.id }))
    } catch (error) {
        const msg = getErrorMessage(error)
        console.log(msg);
        return []
    }
}
