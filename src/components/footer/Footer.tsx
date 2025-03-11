import React from 'react'
import Index from "@/components/footer/Index";
import { getServerSession, Session } from 'next-auth';
import prisma from '@/prisma/prismaclient';
import { userType } from '../editor/Types';
import { getErrorMessage } from '@/lib/errorBoundaries';

export default async function Footer() {
    const session = await getServerSession();
    const user = await getUser({ session });
    return (
        <Index _user={user} />
    )
};


async function getUser({ session }: { session: Session | null }) {
    if (!session) return null;
    const email = session?.user?.email;
    if (!email) return null;
    let user: userType | null = {} as userType;
    try {
        const _user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                admin: true,
                username: true
            }
        });
        if (_user) {
            user = _user as unknown as userType;
            await prisma.$disconnect();
            return user;
        } else {
            await prisma.$disconnect();
            return null;
        }

    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    }
}
