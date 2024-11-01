import React from 'react'
import Index from "@/components/posts/Index";
import styles from "@/components/posts/post.module.css";


type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page() {
    return (
        <div className={styles.pageposts}>
            <Index />
        </div>
    )
}
