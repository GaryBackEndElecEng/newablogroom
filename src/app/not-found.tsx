import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'

interface Props {
    params: { id: string },
    searchParams: { [key: string]: string }
}
export default async function NotFound(req: NextRequest) {
    return (
        redirect("/api/auth/error?misc=/NotFound")
    )
}



