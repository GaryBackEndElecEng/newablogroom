import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';


export default function NotFound() {

    return (
        redirect("/error_page?misc=/NotFound")
    )
}

