"use server";
import React from 'react';
import Index from "./Index";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { userType } from '@/components/editor/Types';

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;


export default async function page() {
    const session = await getServerSession() ? await getServerSession() : null;
    const isEmail = (session && session.user && session.user.email) ? session.user.email : null as string | null;
    const email = isEmail ? isEmail : null;
    const users = await getUsers();
    const admin = await adminUser({ email });
    if (isEmail) {
        return (
            <Index users={users} admin={admin} />
        )
    } else {
        redirect("/")
    }
}

export async function getUsers(): Promise<userType[] | []> {
    let users: userType[] = [];
    try {
        users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                imgKey: true,
                bio: true,
                showinfo: true,
                admin: true,
                username: true,
                blogs: true,
                posts: true
            }
        }) as unknown[] as userType[];
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        await prisma.$disconnect();
        return users;
    }
}

export async function adminUser(item: { email: string | null }): Promise<userType | null> {
    const { email } = item;
    if (!email) return null;
    let user: userType | null = null;
    try {
        user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                imgKey: true,
                bio: true,
                admin: true,
                username: true
            }
        }) as unknown as userType;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        await prisma.$disconnect();
        return user;
    }
}


