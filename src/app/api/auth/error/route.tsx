
import { NextResponse, NextRequest } from 'next/server';

const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL : "http://localhost:3000";

export async function GET(req: NextRequest) {
    //-----------------THIS COMES FROM not-found.tsx page OR signIn issues-----------------//
    ///api/auth/error?error=OAuthAccountNotLinked
    //misc=/NotFound
    const url_ = req.nextUrl;

    const error = url_.searchParams.get("error");//from signIn
    const misc = url_.searchParams.get("misc");//from others

    if (misc) {
        const newUrl: URL = new URL("/errorpage", baseUrl);
        newUrl.searchParams.set("misc", misc);
        newUrl.searchParams.set("source", "api/auth/error");
        return NextResponse.redirect(newUrl.href, 307);
    } else if (error) {
        const newUrl: URL = new URL("/register", baseUrl);
        newUrl.searchParams.set("error", "CredentialsSignin");
        return NextResponse.redirect(newUrl.href, 307);
    } else {

        return NextResponse.next();

    };


}
