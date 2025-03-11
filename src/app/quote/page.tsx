import React from 'react'
import prisma from "@/prisma/prismaclient";
import { getServerSession } from 'next-auth';
import { quoteCalcItemType, userType } from '@/components/editor/Types';
import { getErrorMessage } from '@/lib/errorBoundaries';
import Index from "./index";


export default async function page() {
    const session = await getServerSession();
    const hasEmail = session?.user?.email || null;
    const user = await getUser({ email: hasEmail });
    const list = await getQuoteList();
    return (
        <Index user={user} list={list} />
    )
}

async function getUser({ email }: { email: string | null }) {
    if (!email) return null;
    let user: userType | null = null;
    try {
        user = await prisma.user.findUnique({
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
        }) as unknown as userType;
        await prisma.$disconnect();
        if (user) {
            return user;
        } else {
            return null
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    };
};

async function getQuoteList(): Promise<quoteCalcItemType[]> {
    let list: quoteCalcItemType[] = [];
    try {
        list = await prisma.quote.findMany() as unknown as quoteCalcItemType[];
        if (list) {
            await prisma.$disconnect();
            return list as unknown as quoteCalcItemType[];
        } else {
            return [] as quoteCalcItemType[];
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as quoteCalcItemType[];
    }
}

