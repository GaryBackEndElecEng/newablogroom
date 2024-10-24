import React from 'react'
import Index from "@/components/posts/Index";
import { Metadata, ResolvingMetadata } from 'next';
import Meta from '@/components/meta/meta';
export const metadata = Meta.metaPosts();

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const metaBlogs = await Meta.genposts_metadata(parent);
//     return metaBlogs;

// }

export default function page() {
    return (
        <div className="container-fluid mx-auto">
            <Index />
        </div>
    )
}
