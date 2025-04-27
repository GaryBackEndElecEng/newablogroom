import { getErrorMessage } from "@/components/common/errorBoundary";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaclient";
import { combinedType, nameLetterType, nameRefType, nameResumeType } from "@/components/bio/resume/refTypes";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const body = req.body as combinedType;
        if (!body) { res.status(404).json({ msg: "un authorized" }) };
        const { nameRefs, nameLetters, nameResumes } = body;
        const retnameRefs = nameRefs ? await saveRefs({ nameRefs: nameRefs as nameRefType[] }) : null;
        const retNameLets = nameLetters ? await saveLets({ nameLetters: nameLetters as nameLetterType[] }) : null;
        const retResumes = await saveResumes({ nameResumes });
        if (retnameRefs || retNameLets) {
            const retResults = { ...body, nameRefs: retnameRefs, nameLetters: retNameLets, nameResumes: retResumes };
            res.status(200).json(retResults);

        } else {
            res.status(400).json({ msg: "failure accured at the function level:saveRefs()/saveLets()" })
        }
        return await prisma.$disconnect();
    } else if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string };
        try {
            const getresumes = await prisma.resume.findMany({
                where: { user_id },
                select: {
                    id: true,
                    user_id: true,
                    name: true
                }
            });
            const getrefs = await prisma.reference.findMany({
                where: { user_id },
                select: {
                    id: true,
                    name: true,
                    user_id: true,
                    res_name_id: true
                }
            });
            const getletters = await prisma.letter.findMany({
                where: { user_id },
                select: {
                    id: true,
                    name: true,
                    user_id: true,
                    res_name_id: true
                }
            });
            const combined = { nameResumes: getresumes, nameRefs: getrefs, nameLetters: getletters } as combinedType
            res.status(200).json(combined);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(500).json({ msg });
            return await prisma.$disconnect();
        }
    }
};

async function saveRefs({ nameRefs }: { nameRefs: nameRefType[] }): Promise<nameRefType[] | null> {
    if (nameRefs?.length <= 0) {
        return null
    };
    const nameRefs_ = await Promise.all(nameRefs.map(async (nameRef) => {
        const { id, res_name_id } = nameRef;

        const nameRef_ = await prisma.reference.update({
            where: { id },
            data: {
                res_name_id: res_name_id || null
            },
            select: {
                id: true,
                name: true,
                user_id: true,
                res_name_id: true
            }
        });
        if (nameRef_) {
            nameRef = nameRef_;
        }
        await prisma.$disconnect()
        return nameRef
    }));

    return nameRefs_;

};

async function saveResumes({ nameResumes }: { nameResumes: nameResumeType[] }): Promise<nameResumeType[] | null> {
    if (nameResumes?.length <= 0) {
        return null
    };
    const nameResumes_ = await Promise.all(nameResumes.map(async (nameResume) => {

        const { id, enable } = nameResume;

        const nameResume_ = await prisma.resume.update({
            where: { id },
            data: {
                enable: enable || false
            },
            select: {
                id: true,
                name: true,
                user_id: true,
                enable: true
            }
        });
        await prisma.$disconnect()
        if (nameResume) {
            nameResume = nameResume_

        }
        return nameResume
    }));

    return nameResumes_;

};

async function saveLets({ nameLetters }: { nameLetters: nameLetterType[] }): Promise<nameLetterType[] | null> {
    if (nameLetters?.length <= 0) {
        return null
    };
    const nameletters_ = await Promise.all(nameLetters.map(async (nameLet) => {

        const { id, res_name_id } = nameLet;

        const nameLet_ = await prisma.letter.update({
            where: { id },
            data: {
                res_name_id: res_name_id || null
            },
            select: {
                id: true,
                name: true,
                user_id: true,
                res_name_id: true
            }

        });
        if (nameLet_) {
            nameLet = nameLet_ as nameLetterType
        }

        await prisma.$disconnect()
        return nameLet

    }));
    return nameletters_;

};