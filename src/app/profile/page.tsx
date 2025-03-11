import React from 'react'
import prisma from "@/prisma/prismaclient";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Index from "../../components/profile/Index";
import { userType } from '@/components/editor/Types';
import { getErrorMessage } from '@/lib/errorBoundaries';

export default async function page() {
    const session = await getServerSession();
    const isEmail = session?.user?.email ? session.user.email : null;
    if (isEmail) {
        const user = await getUser({ email: isEmail });

        return (
            <Index user={user} />
        )

    } else {
        redirect("/");
    };

};

export async function getUser(item: { email: string }) {
    const { email } = item;
    let user: userType | null = null;
    try {
        user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                imgKey: true,
                image: true,
                bio: true,
                showinfo: true,
                admin: true,
                username: true,
                blogs: true,
                posts: true,
                quoteImgs: true,
                devpDeployimgs: true
            }
        }) as unknown as userType;
        if (user) {
            await prisma.$disconnect();
            return user;
        } else {
            await prisma.$disconnect();
            return null;
        };

    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    };

}
