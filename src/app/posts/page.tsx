import React from 'react'
import Index from "@/components/posts/Index";



type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page() {
    return (
        <div className="isLocal container-fluid mx-auto">
            <Index />
        </div>
    )
}
