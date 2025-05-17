import { redirect } from 'next/navigation';




export default async function NotFound() {

    return (
        redirect("/api/auth/error?misc=/NotFound")
    )
}



