
import React from 'react';
import Index from "./Index";
import { getServerSession, Session } from 'next-auth';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/lib/errorBoundaries';
import { userType } from '../editor/Types';
import { letterType, mainIntroLetterType, mainResumeRefType, mainResumeStrType, resumeRefStrType, resumeRefType, resumeType } from '../bio/resume/refTypes';

const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
export default async function Header() {
    const session = await getServerSession();
    const user = await getuser({ session })
    return (
        <Index _user_={user} />
    )
};

export async function getuser(item: { session: Session | null }): Promise<userType | null> {
    const { session } = item;
    let user: userType | null = null;
    if (session === null) return null;
    if (session.user === undefined) return null;
    if (!(session.user.email)) return null;
    const email = session.user.email;
    try {
        user = await prisma.user.findUnique({
            where: { email: email },
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
                username: true,
                resumes: true,
                references: true,
                letters: true
            }
        }) as unknown as userType;
        if (user) {
            if ((user.email === EMAIL || user.email === EMAIL2)) {
                user.admin = true;
            };
            await prisma.$disconnect();
            const _user = convertJSON({ user });
            return _user;
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


function convertJSON({ user }: { user: userType }): userType {
    const letters = user.letters;
    const refs = user.references as resumeRefStrType[];
    const resumes = user.resumes as mainResumeStrType[];
    const convLetters = letters.map(_let => {
        const convLet = JSON.parse(_let.letter as unknown as string) as letterType
        return { ..._let, letter: convLet } as unknown as mainIntroLetterType
    }) as unknown as mainIntroLetterType[];
    const refers = refs.map(ref => {
        const references = JSON.parse((ref as resumeRefStrType).reference as string) as resumeRefType[]
        return { ...ref, references: references }
    }) as mainResumeRefType[];

    const convResumes = resumes.map(res => {
        const convRes = JSON.parse(res.resume as string) as resumeType
        return { ...res, resume: convRes }
    });

    user = { ...user, letters: convLetters, references: refers, resumes: convResumes };
    return user;
}

