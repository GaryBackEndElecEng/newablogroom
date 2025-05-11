
import { NextResponse, NextRequest } from 'next/server';

const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL : "http://localhost:3000";

export async function GET(req: NextRequest) {
    //-----------------THIS COMES FROM not-found.tsx page OR signIn issues-----------------//
    ///api/auth/error?error=OAuthAccountNotLinked
    //misc=/NotFound
    const url_ = new URL(req.url);
    // console.log(url_)//works
    const error = url_.searchParams.get("error");//from signIn
    const misc = url_.searchParams.get("misc");//from others
    if (misc) {
        const newUrl: URL = new URL("/error_page", baseUrl);
        newUrl.searchParams.set("misc", "/NotFound");
        return NextResponse.redirect(newUrl.href, 302);
    } else if (error) {
        const newUrl: URL = new URL("/register", baseUrl);
        newUrl.searchParams.set("error", "CredentialsSignin");
        return NextResponse.redirect(newUrl.href, 302);
    } else {
        //blog
        const newUrl: URL = new URL("/blogs", baseUrl);
        return NextResponse.redirect(newUrl.href, 302);

    };


}
