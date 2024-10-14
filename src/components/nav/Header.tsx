import React from 'react';
import Index from "./Index";
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { getErrorMessage } from '@/lib/errorBoundaries';
import { userType } from '../editor/Types';
import { getUserImage } from '@/lib/awsFunctions';
const prisma = new PrismaClient();
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
import { getServerSession } from "next-auth";

export default async function Header() {
    const session = await getServerSession()
    const user = await getUser({ session: session }) as unknown as userType | undefined
    return (
        <Index user_={user} />
    )
}

async function getUser(item: { session: Session | null }) {
    const { session } = item;
    if (!session) return;
    const email = session && session?.user?.email;
    if (email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    imgKey: true,
                    bio: true,
                    sessions: true,
                    accounts: true,
                    showinfo: true,
                    admin: true
                }
            });
            if (user) {
                let updateUser = user as unknown as userType;
                if (user.email === EMAIL || user.email === EMAIL2) {
                    updateUser = { ...updateUser, admin: true }
                } else {
                    updateUser = { ...updateUser, admin: false }
                }
                const userImg = await getUserImage(updateUser)
                return userImg;
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg)
        } finally {
            await prisma.$disconnect();

        }
    }
}
