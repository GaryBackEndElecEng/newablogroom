import { letterType, mainIntroLetterStrType, mainIntroLetterType, mainResumeRefType, mainResumeType, resumeRefStrType, resumeRefType, resumeType, } from '@/components/bio/resume/refTypes';
import { getErrorMessage } from '@/components/common/errorBoundary';
import prisma from "@/prisma/prismaclient";
import React from 'react';
import Index from './Index';
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params
    const resume = await getResume({ nameResume: slug });
    return retMetadata({ mainResume: resume, parent });


};



export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const resume = await getResume({ nameResume: slug });
    const name = resume ? resume.name : null;
    const references = await getReference({ nameResume: name });
    const mainLetters = await getLetters({ nameResume: name });
    if (name) {

        return (
            <Index
                mainResume={resume}
                mainRefs={references}
                mainLetters={mainLetters}
            />

        )
    } else {
        redirect("/")
    }
};



export async function getResume({ nameResume }: { nameResume: string }): Promise<mainResumeType | null> {
    if (!nameResume) return null;
    try {
        const getresume = await prisma.resume.findUnique({
            where: { name: nameResume }
        });
        if (getresume && getresume.enable && getresume.resume as string) {
            const resume = { ...getresume, resume: JSON.parse(getresume.resume as string) as resumeType }
            return resume as mainResumeType
        } else {
            await prisma.$disconnect();
            return null;
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return null;
    }
};

export async function getReference({ nameResume }: { nameResume: string | null }): Promise<mainResumeRefType[] | null> {
    if (!nameResume) return null;
    try {
        const getrefs = await prisma.reference.findMany({
            where: { res_name_id: nameResume }
        }) as resumeRefStrType[];
        if (getrefs) {
            const mainrefs: mainResumeRefType[] = [];
            getrefs.map(mainref => {
                if (mainref) {
                    const convJS: resumeRefType[] = [];
                    const tojson = JSON.parse(mainref.reference as string) as unknown as resumeRefType[]
                    tojson.map(js => {
                        convJS.push(js);
                    })
                    mainrefs.push({ ...mainref, references: convJS });
                }
            });
            await prisma.$disconnect();
            return mainrefs as mainResumeRefType[]
        } else {
            await prisma.$disconnect();
            return [] as mainResumeRefType[];
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as mainResumeRefType[];
    }
};

export async function getLetters({ nameResume }: { nameResume: string | null }): Promise<mainIntroLetterType[] | null> {
    if (!nameResume) return null;
    try {
        const getLets = await prisma.letter.findMany({
            where: { res_name_id: nameResume }
        }) as mainIntroLetterStrType[];
        if (getLets) {
            const mainLets: mainIntroLetterType[] = [];
            getLets.map(mainLet => {
                if (mainLet) {
                    const tojson = JSON.parse(mainLet.letter as string) as unknown as letterType
                    mainLets.push({ ...mainLet, letter: tojson });

                }
            });
            await prisma.$disconnect();
            return mainLets as mainIntroLetterType[]
        } else {
            await prisma.$disconnect();
            return [] as mainIntroLetterType[];
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        await prisma.$disconnect();
        return [] as mainIntroLetterType[];
    }
};




export async function retMetadata({ mainResume, parent }: { mainResume: mainResumeType | null, parent: ResolvingMetadata }): Promise<Metadata> {

    if (mainResume) {
        const { name: filename, resume } = mainResume;
        const url = `https:///www.ablogroom/showresume/${filename}`;
        const { contact, summary, workExperience, education, sites } = resume;
        const keywords: string[] = [];
        workExperience.map(exp => {
            if ((exp?.title)) {
                keywords.push(exp.title)
            } else if (exp?.company) {
                keywords.push(exp.company)
            };
        });
        education.map(exp => {
            if ((exp?.school)) {
                keywords.push(exp.school)
            } else if (exp?.degree) {
                keywords.push(exp.degree)
            };
        });

        const title = `${contact.name}'s complete resume`;
        const authors: { name: string, url: string }[] | undefined = sites.map(site => ({ name: contact.name, url: site }))

        const initImgs: { url: string, width: number, height: number }[] = [

            {
                url: "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/castleOcean600X240.png",
                width: 600,
                height: 240
            },
        ];
        const desc = summary.split(" ").slice(0, 25).join(" ")

        const metaReturn: Metadata = {
            title: {
                default: title || "ablogroom blog",
                template: `%s | ${title || "ablogroom blog"}`,

            },

            description: `personal resume of ${contact?.name || "author"}: ${desc}`,
            generator: "ablogroom using Next.js",
            referrer: "origin-when-cross-origin",
            keywords: keywords,
            authors: authors,
            creator: "Gary Wallace",
            publisher: "ablogroom",
            formatDetection: {
                email: true,
                address: false,
                telephone: true
            },
            openGraph: {
                title: "ablogroom",
                description: `${resume?.name || "author's"} resume`,
                url: url || "https://www.ablogroom/",
                siteName: "ablogroom",
                images: initImgs,
            },
        }
        return Promise.resolve(metaReturn) as Promise<Metadata>;
    } else {
        const metaReturn: Metadata = {
            title: {
                default: "ablogroom blog",
                template: `%s | ${"ablogroom blog"}`,

            },

            description: `personal resume `,
            generator: "ablogroom using Next.js",
            referrer: "origin-when-cross-origin",
            keywords: [],
            authors: [],
            creator: "Gary Wallace",
            publisher: "ablogroom",
            formatDetection: {
                email: true,
                address: false,
                telephone: true
            },

        }
        return Promise.resolve(metaReturn) as Promise<Metadata>
    }
};