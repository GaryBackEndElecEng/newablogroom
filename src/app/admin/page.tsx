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
    const isEmail = session?.user?.email || null;
    const email = ((isEmail === EMAIL) || (isEmail === EMAIL2)) ? isEmail : null;
    const users = await getUsers();
    const admin = await adminUser({ email });
    if (email) {
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
                posts: true,
                resumes: true,
            }
        }) as unknown[] as userType[];
        if (users) {
            await prisma.$disconnect();
            return users;
        }
        return [] as userType[];
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as userType[]
    }
};



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
        if (user) {
            await prisma.$disconnect();
            return user;
        };
        return null;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null
    };
};


