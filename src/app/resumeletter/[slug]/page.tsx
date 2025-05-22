import React from 'react'
import styles from "@/components/printResume/print.module.css";
import Index from './Index';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/components/common/errorBoundary';
import { mainIntroLetterType, mainResumeType } from '@/components/bio/resume/refTypes';
import { redirect } from 'next/navigation';


type Props = {

    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
// GENERATEPARAMS FROM ALL THREE TABLES FOR A DYNAMIC 

export default async function page({ params }: { params: Promise<{ [key: string]: string | undefined }> }) {
    const { slug } = await params;//nameLetter
    const resume = await getResume({ name: slug });
    const mainLetter = await getLetter({ res_name_id: slug as string | undefined, user_id: resume?.user_id });
    if (mainLetter) {
        return (
            <div className={styles.printpage}>
                <Index mainLetter={mainLetter} mainResume={resume} />
            </div>
        )

    } else {
        redirect("/bio");
    }
};


async function getLetter({ res_name_id, user_id }: { res_name_id: string | undefined, user_id: string | undefined }): Promise<mainIntroLetterType | null> {
    if (!(res_name_id || user_id)) return null;
    try {
        const getLetters = await prisma.letter.findMany({
            where: { res_name_id: res_name_id, user_id },
        });
        if (getLetters) {
            const getLetter = getLetters[0];
            if (getLetter) {

                await prisma.$disconnect();
                return { ...getLetter, letter: JSON.parse(getLetter.letter as string) } as mainIntroLetterType
            }
            await prisma.$disconnect();
            return null;
        } else {
            await prisma.$disconnect();
            return null
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null
    };

};

async function getResume({ name }: { name: string | undefined }): Promise<mainResumeType | null> {
    if (!(name && name?.length > 0)) return null;
    try {
        const _resume = await prisma.resume.findUnique({
            where: { name },
        });
        if (_resume) {
            await prisma.$disconnect();
            return { ..._resume, resume: JSON.parse(_resume.resume as string) } as mainResumeType;
        }
        await prisma.$disconnect();
        return null;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    }
};





