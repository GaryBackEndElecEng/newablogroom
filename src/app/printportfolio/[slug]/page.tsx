import React from 'react'
import styles from "./print.module.css";
import Index from './Index';
import prisma from "@/prisma/prismaclient";
import { getErrorMessage } from '@/components/common/errorBoundary';
import { mainResumeRefType, mainResumeType, resumeRefStrType, mainResumeStrType, mainIntroLetterStrType, letterType, mainIntroLetterType } from '@/components/bio/resume/refTypes';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

type Props = {

    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
// GENERATEPARAMS FROM ALL THREE TABLES FOR A DYNAMIC 

export default async function page({ params }: { params: Promise<{ [key: string]: string | undefined }> }) {
    const { slug } = await params;//nameLetter
    console.log("PARAMS", slug)
    // const mainResume = await getResume({ name: nameResume as string | undefined });
    // const mainResumeRef = await getReference({ name: nameRef as string | undefined });
    const mainLetter = await getLetter({ name: slug as string | undefined });
    // const check = !!(mainResume || mainResumeRef || mainLetter)
    if (true) {
        return (
            <div className={styles.printpage}>
                <Index mainLetter={mainLetter} />
            </div>
        )

    } else {
        redirect("/bio");
    }
};

async function getResume({ name }: { name: string | undefined }): Promise<mainResumeType | null> {
    if (!(name)) return null;

    try {
        const getresume = await prisma.resume.findUnique({
            where: { name: name },
        }) as unknown as mainResumeStrType;
        if (getresume) {
            return { ...getresume, resume: JSON.parse(getresume.resume) } as mainResumeType
        } else {
            return null;
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    }
};

async function getReference({ name }: { name: string | undefined }): Promise<mainResumeRefType | null> {
    if (!(name)) return null;
    try {
        const getresume = await prisma.reference.findUnique({
            where: { name: name },
        }) as unknown as resumeRefStrType;
        if (getresume) {
            return { ...getresume, references: JSON.parse(getresume.reference) } as mainResumeRefType
        } else {
            return null;
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
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

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const { nameResume, nameRef, nameLetter } = await searchParams;
    const mainResume = await getResume({ name: nameResume as string | undefined });
    const mainResumeRef = await getReference({ name: nameRef as string | undefined });
    const mainLetter = await getLetter({ name: nameLetter as string | undefined });
    return retMetadata({ mainResume, mainResumeRef, mainLetter })
}

export function retMetadata({ mainResume, mainResumeRef, mainLetter }: { mainResume: mainResumeType | null, mainResumeRef: mainResumeRefType | null, mainLetter: mainIntroLetterType | null }) {
    let desc: string = "";
    let name_: string = "undefined";
    let keywords: string[] = [];
    const authors: { name: string, url: string }[] = [];
    if (mainResume) {
        const { name, resume } = mainResume;
        name_ = `?nameResume=${name}`;
        const username = Object.entries(resume.contact).find(kv => (kv[0] === "name"));
        if (username) {
            authors.push({ name: username[1], url: "https://www.ablogroom.com" });
        }
        desc += resume.summary.split(" ").slice(0, 80).join(" ");
        const words = Object.values(resume.contact);
        keywords = keywords.concat(words)
    } else if (mainResumeRef) {
        const { name, references } = mainResumeRef;
        name_ = `?nameRef=${name}`;
        authors.push({ name: "Gary Wallace", url: "https://www.ablogroom.com" });
        desc += references.map(kv => (kv.desc)).join(",");
        const names = references.map(ref => (ref.name));
        keywords = keywords.concat(names);
    } else if (mainLetter) {
        const { name, letter } = mainLetter;
        name_ = `?nameLetter=${name}`;
        const username = Object.entries(letter.contact).find(kv => kv[0] === "name");
        if (username) {
            authors.push({ name: username[1], url: "https://www.ablogroom.com" });
        }
        desc += letter.summary.split(" ").slice(0, 80).join(" ");
        const contacts = Object.values(letter.contact);
        keywords = keywords.concat(contacts);
    }


    const metadata: Metadata = {
        alternates: {
            canonical: '/print' + name_,
            languages: {
                'en-US': '/en-US',
                'fr-CA': '/fr-CA',
            },
        },
        title: {
            default: "Print Resume",
            template: `%s | Print Resume`,

        },
        category: "resume",
        description: desc,
        generator: "Next.js",
        applicationName: "Resume Builder",
        referrer: "origin-when-cross-origin",
        keywords: ["Print your resume", "Cover Letter", "Resume Builder"].concat(keywords),
        authors: authors,
        // colorScheme:"light",
        creator: "Gary Wallace",
        publisher: "Gary Wallace",
        formatDetection: {
            email: true,
            address: false,
            telephone: true
        },
        openGraph: {
            title: "Resume Builder",
            description: 'Generated by www.masterconnect.ca,tools for you',
            url: "https://www.ablogroom.com",
            siteName: "ablogroom",
            images: [
                {
                    url: "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/resumeBuilder600x433.png",
                    width: 600,
                    height: 433
                },
                {
                    url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/gb_logo_600.png",
                    width: 600,
                    height: 600
                },

                {
                    url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/thankYou.png",
                    width: 600,
                    height: 900
                },
            ],
            locale: "en-CA",
            type: "website"

        },


    };
    return metadata;
};




