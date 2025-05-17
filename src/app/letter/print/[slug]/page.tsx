import React from 'react'
import styles from "@/components/printResume/print.module.css";
import Index from './Index';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/components/common/errorBoundary';
import { mainIntroLetterStrType, letterType, mainIntroLetterType } from '@/components/bio/resume/refTypes';
import { redirect } from 'next/navigation';


type Props = {

    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
// GENERATEPARAMS FROM ALL THREE TABLES FOR A DYNAMIC 

export default async function page({ params }: { params: Promise<{ [key: string]: string | undefined }> }) {
    const { slug } = await params;//nameLetter

    const mainLetter = await getLetter({ name: slug as string | undefined });
    if (mainLetter) {
        return (
            <div className={styles.printpage}>
                <Index mainLetter={mainLetter} />
            </div>
        )

    } else {
        redirect("/bio");
    }
};


async function getLetter({ name }: { name: string | undefined }): Promise<mainIntroLetterType | null> {
    if (!name) return null;
    try {
        const getLetter = await prisma.letter.findUnique({
            where: { name },
        }) as mainIntroLetterStrType;
        if (getLetter) {
            const convLetter = {
                ...getLetter,
                letter: JSON.parse(getLetter.letter) as letterType
            } as mainIntroLetterType
            await prisma.$disconnect();
            return convLetter
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

}





