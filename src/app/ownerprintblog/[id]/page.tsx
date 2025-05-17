import React from 'react';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { blogType, userType } from '@/components/editor/Types';
import { redirect } from 'next/navigation';
import Index from '../index';
import { getServerSession, Session } from 'next-auth';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
}

export default async function page(props: Props) {
    const session = await getServerSession();
    const user = await getUser({ session });
    const params = await props.params;
    const id = Number(params.id);
    const blog = await getBlog({ id });
    if (blog) {
        const owner = await getOwner({ user_id: blog.user_id });
        const isOwner = owner?.showinfo ? owner : null;
        return (
            <Index blog={blog} owner={isOwner} user={user} />
        )
    } else {
        redirect(`/blogs`);
    }
};


async function getBlog(item: { id: number }): Promise<blogType | null> {
    const { id } = item;
    if (!id) return null;

    try {
        const blog = await prisma.blog.findUnique({
            where: { id: id, show: true },
            include: {
                selectors: true,
                messages: false,
                elements: true,
                codes: {
                    include: {
                        linecode: true
                    }
                },
                pageCounts: true,
                charts: true
            }
        }) as unknown as blogType;
        return blog;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
        await prisma.$disconnect();
        return null;
    }
};


async function getOwner(item: { user_id: string }) {
    const { user_id } = item;
    if (!user_id) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id, showinfo: true },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                username: true
            }
        }) as unknown as userType;
        return user
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    };
};

async function getUser(item: { session: Session | null }) {
    const { session } = item;
    if (!(session?.user?.email)) return null;
    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email, showinfo: true },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                username: true
            }
        }) as unknown as userType;
        return user
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    };
};



