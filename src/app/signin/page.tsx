import React from 'react';
import Index from "./Index";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await getServerSession();
    if (!session) {

        return (
            <div className="d-flex flex-column place-items-center container-fluid mx-auto"><Index /></div>
        )
    } else {
        redirect("/");
    }
}
