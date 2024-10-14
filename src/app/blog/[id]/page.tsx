import React from 'react';
import Index from "@/components/blog/Index";
import Meta from "@/components/meta/meta";
import type { Metadata, ResolvingMetadata } from "next";
// import { getErrorMessage } from '@/lib/errorBoundaries';
import { redirect } from 'next/navigation';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL as string : "http:///localhost:3000";

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const singleBlog = await Meta.generateSingleMetadata({ params }, parent);
    return singleBlog;
    //GENERATES AVAILABLE IDS FOR SINGLE PULL
}

export default async function page({ params }: { params: { id: string } }) {
    const id = params.id;
    const check1: { id: number | null, user_id: string | null } = await Meta.blogExist({ id: parseInt(id) });
    const style: { [key: string]: string } = { minHeight: "100vh", height: "100%" };
    if (check1.id) {
        return (
            <div style={style}>
                <Index id={id} />
            </div>
        )
    }
    return (redirect(`/error_page?blog_id=${id}`))
}





