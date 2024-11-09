
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
    ///api/auth/error?error=OAuthAccountNotLinked
    const url_ = new URL(req.url)
    const error = url_.searchParams.get("error")
    const newUrl: URL = new URL("/register", url_.origin);
    if (error) {
        newUrl.searchParams.set("error", error)
    }
    return NextResponse.redirect(newUrl.href)


}
