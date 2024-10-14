
import { NextResponse, NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    const pages = ['/', '/blog/', '/blogs', "/register", "/editor", "/policy", "/termsOfService", "/admin", "/chart"];
    // const csrf = req.cookies.get("next-auth.csrf-token")?.value;
    if (req && req.url) {
        const url = new URL(req.url);
        const checkUrl = pages.find(pathname => (pathname !== url.pathname));
        const getError = url.searchParams.get("error")
        if (getError) {
            return NextResponse.redirect(new URL(`/register`, url.origin))
        } else if (!checkUrl) {
            return NextResponse.redirect(new URL(`/error_page?misc=${url.pathname}`, url.origin))
        } else {
            return NextResponse.next()
        }
    }
}
export const config = {
    matcher: [
        '/api/auth/signin',
        '/blogs',
        '/blogs/:path*',
        '/register/:path*',
        '/editor/:path*',
        '/editor',
        '/termsOfService/:path*',
        '/policy/:path*',
        '/admin/:path*',
        '/chart',

    ]
}


// }
// const providers = await getProviders()
// console.log(providers && providers.credentials)//works NEXTAUTH_URL
//PROVIDER
// {
//     id: 'credentials',
//     name: 'log in',
//     type: 'credentials',
//     signinUrl: 'https://www.ablogroom.com/api/auth/signin/credentials',
//     callbackUrl: 'https://www.ablogroom.com/api/auth/callback/credentials'
//   }

// export const config = {
//     matcher: [
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
//     '/about/:path*', '/dashboard/:path*'
//     ],
//   }

