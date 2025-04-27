import React from 'react'
import Index from "@/components/bio/resume/Index";
import { getServerSession, Session } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/components/common/errorBoundary';
import { letterType, mainIntroLetterType, mainResumeRefType, resumeRefStrType, resumeRefType, resumeType, userType } from '@/components/bio/resume/refTypes';


export default async function page() {
    const session = await getServerSession()
    const user = await getUser({ session });

    if (session) {
        return (
            <Index user={user} />
        )

    } else {
        return (
            redirect("/signin")
        )
    }
}

async function getUser({ session }: { session: Session | null }): Promise<userType | null> {
    if (session?.user?.email) {
        const email = session.user.email;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    bio: true,
                    letters: true,
                    references: true,
                    resumes: true,
                    admin: true,
                }
            });
            if (user) {
                await prisma.$disconnect();
                const convUser = convertJSON({ user: user as unknown as userType })
                return convUser as unknown as userType
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return null;
        }
    };
    return null;
}

function convertJSON({ user }: { user: userType }): userType {
    const letters = user.letters;
    const refs = user.references;
    const resumes = user.resumes;
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