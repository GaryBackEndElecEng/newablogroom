
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest) {

    // const params = req.nextUrl.searchParams;//works
    const url_ = new URL(req.url)


    return NextResponse.redirect(new URL("/register", url_.origin))
}
