import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

interface Props {
    params: { id: string },
    searchParams: { [key: string]: string }
}
export default async function NotFound() {
    // const headersList = await headers()
    // const domain = headersList.get("host");
    // headersList.forEach((key, value) => {
    //     if (key) {

    //         console.log("PARAMS,SEARCHPARAMS:", value, key)
    //     }

    // });


    return (
        redirect("/error_page?misc=/NotFound")
    )
}

