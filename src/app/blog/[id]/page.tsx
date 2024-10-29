
import React from 'react';
import Index from "@/components/blog/Index";
import type { ResolvingMetadata } from "next";



type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
// export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     // console.log("generateMetadata", params, searchParams)//works
//     const singleBlog = await Meta.generateSingleMetadata({ params }, parent);
//     return singleBlog;
//     //GENERATES AVAILABLE IDS FOR SINGLE PULL
// }

export default async function page({ params }: { params: { id: string } }) {
    const id = Number(params.id as string);
    const style: { [key: string]: string } = { minHeight: "100vh", height: "100%" };

    return (
        <div style={style} className="isLocal">
            <Index id={id} />
        </div>
    )

}





