import { NextRequest } from "next/server";
import { userType } from "@/components/editor/Types";
import { mailOptions, transporter } from "@/components/emails/nodemailer";
import { signUpHTML, signUpText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getServerSession } from "next-auth";
import { redirect, } from "next/navigation";
import prisma from "@/prisma/prismaclient"



export async function GET(req: NextRequest) {
    //THIS IS DIRECTED FROM NEXT-AUTH OPTIONS FOR NEW USERS @/lib/auth/options
    const session = await getServerSession();

    if (session?.user?.email) {
        // console.log("NEW USER: SESSION", session)
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: session.user.email
                }
            });
            if (user) {
                const username = user.name || "blogger";
                await transporter.sendMail({
                    ...mailOptions(user.email),
                    subject: `Thank you ${username} for Signin up!`,
                    text: signUpText({ user: user as unknown as userType }),
                    html: await signUpHTML({ user: user as unknown as userType })
                });
                await prisma.$disconnect();
                return redirect("/");
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            await prisma.$disconnect();
            return redirect("/register");
        }
    } else {
        await prisma.$disconnect();
        console.error("no server session from /auth/new-user")
        return redirect("/register");
    }
}