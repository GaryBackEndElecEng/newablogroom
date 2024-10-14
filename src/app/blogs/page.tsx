import React from 'react';
import type { Metadata, ResolvingMetadata } from "next";
import Index from "@/components/blogs/Index";
import Meta from "@/components/meta/meta";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const metaBlogs = await Meta.generate_metadata(parent);
    return metaBlogs;

}
export default async function Page() {
    return (
        <div style={{ minHeight: "110vh", width: "100%" }}>
            <Index />

        </div>
    )
}





