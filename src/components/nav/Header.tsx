
import React from 'react';
import Index from "./Index";
import { getServerSession, Session } from 'next-auth';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { userType } from '../editor/Types';

const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
export default async function Header() {
    const session = await getServerSession();
    const user = await getuser({ session })
    return (
        <Index _user_={user} />
    )
}

export async function getuser(item: { session: Session | null }): Promise<userType | null> {
    const { session } = item;
    let user: userType | null = null;
    if (!(session && session.user && session.user.email)) return null;
    try {
        user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                admin: true,
                username: true
            }
        }) as unknown as userType;
        if (user && (user.email === EMAIL || user.email === EMAIL2)) {
            user.admin = true;
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        await prisma.$disconnect();
        return user;
    }
}

