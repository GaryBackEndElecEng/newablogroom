import React from 'react'
import Index from './Index';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function error_() {
    const session = await getServerSession();
    if (!session) {

        return (
            <div className="w-100"><Index /> </div>
        )
    } else {
        redirect("/");
    }
}