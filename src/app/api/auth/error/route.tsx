
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
    //-----------------THIS COMES FROM not-found.tsx page OR signIn issues-----------------//
    ///api/auth/error?error=OAuthAccountNotLinked
    //misc=/NotFound
    const arr: string[] = ["error", "misc"];
    const url_ = new URL(req.url);
    // console.log(url_)//works
    const error = url_.searchParams.get("error");
    const misc = url_.searchParams.get("misc");
    if (misc) {
        const newUrl: URL = new URL("/error_page", url_.origin);
        newUrl.searchParams.set("misc", "/NotFound");
        return NextResponse.redirect(newUrl.href, 302);
    } else if (error) {
        const newUrl: URL = new URL("/register", url_.origin);
        newUrl.searchParams.set("error", "CredentialsSignin");
        return NextResponse.redirect(newUrl.href, 302);
    } else {
        //blog
        const newUrl: URL = new URL("/blogs", url_.origin);
        return NextResponse.redirect(newUrl.href, 302);

    };


}
