import { NextRequest } from "next/server";
import { userType } from "@/components/editor/Types";
import { mailOptions, transporter } from "@/components/emails/nodemailer";
import { signUpHTML, signUpText } from "@/components/emails/templates";
import { PrismaClient, Session } from "@prisma/client";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getServerSession } from "next-auth";
import { redirect, } from "next/navigation";
import prisma from "@/prisma/prismaclient"


// const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL as string : "http://localhost:3000";
export async function GET(req: NextRequest) {
    const callback = req.nextUrl.searchParams.get("callbackUrl") ? req.nextUrl.searchParams.get("callbackUrl") as string : "/"
    //THIS IS DIRECTED FROM NEXT-AUTH OPTIONS FOR NEW USERS @/lib/auth/options
    const session = await getServerSession() as Session | null

    if (session && session.userId) {
        // console.log("NEW USER: SESSION", session)
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: session.userId
                }
            });
            if (user) {
                const username = user.name ? user.name : "blogger";
                await transporter.sendMail({
                    ...mailOptions(user.email),
                    subject: `Thank you ${username} for Signin up!`,
                    text: signUpText({ user: user as unknown as userType }),
                    html: await signUpHTML({ user: user as unknown as userType })
                });
                await prisma.$disconnect();
                return redirect(callback);
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return redirect("/register");
        }
    } else {
        await prisma.$disconnect();
        console.error("no server session from /auth/new-user")
        return redirect("/register");
    }
}