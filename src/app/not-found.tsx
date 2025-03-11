import { redirect } from 'next/navigation';



interface Props {
    params: { id: string },
    searchParams: { [key: string]: string }
}
export default async function NotFound(req: Request) {

    return (
        redirect("/api/auth/error?misc=/NotFound")
    )
}



