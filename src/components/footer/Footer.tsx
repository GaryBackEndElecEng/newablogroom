import React from 'react'
import Index from "@/components/footer/Index";
import { getServerSession } from 'next-auth';

export default async function Footer() {
    const session = await getServerSession();
    return (
        <Index session={session} />
    )
}
