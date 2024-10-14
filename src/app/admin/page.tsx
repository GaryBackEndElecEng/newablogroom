import React from 'react';
import Index from "./Index";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;


export default async function page() {
    const session = await getServerSession() ? await getServerSession() : null;
    const isEmail = session?.user?.email ? (session.user.email === EMAIL || session.user.email === EMAIL2) ? true : false : false
    if (isEmail) {
        return (
            <Index />
        )
    } else {
        redirect("/")
    }
}


