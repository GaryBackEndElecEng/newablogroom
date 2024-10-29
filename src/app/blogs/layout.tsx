"use server";//USE SERVER CAN ONLY EXPORT ASYNC FUNCTION
import React from 'react';
import type { ResolvingMetadata } from 'next';
// export const metadata: Metadata = meta.metaBlogs();
// const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL as string : process.env.DOMAIN as string;


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const metaBlogs = await Meta.generate_metadata(parent);
//     return metaBlogs;
//}

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