"use server"
import React from 'react'
import Index from "@/components/posts/Index";
import { Metadata, ResolvingMetadata } from 'next';


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const metaBlogs = await Meta.genposts_metadata(parent);
//     return metaBlogs;

// }

export default async function page() {
    return (
        <div className="isLocal container-fluid mx-auto">
            <Index />
        </div>
    )
}
