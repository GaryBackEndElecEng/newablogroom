
import { getErrorMessage } from "@/components/common/errorBoundary";
import { mainResumeStrType, mainResumeType, resumeType } from "@/components/bio/resume/refTypes";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const mainResume = req.body as mainResumeType;
        if (!mainResume) return res.status(400).json({ msg: "nothing recieved" });
        const { id, name, resume, user_id, french } = mainResume;
        resume.id = id
        try {
            if (!name) return res.status(400).json({ msg: "no name ID" }); await prisma.$disconnect();
            const getresume = await prisma.resume.upsert({
                where: { name },
                create: {
                    name,
                    user_id,
                    french,
                    resume: JSON.stringify(resume),
                },
                update: {
                    french,
                    resume: JSON.stringify(resume),
                }
            });
            if (getresume) {
                const { id, name, resume, french } = getresume;
                const _resume = JSON.parse(resume as string) as resumeType;
                const convert = { id, name, user_id, resume: { ..._resume, id, name }, french };
                res.status(200).json(convert);
                return await prisma.$disconnect()
            } else {
                res.status(304).json({ msg: "could not return" });
                return await prisma.$disconnect()
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        const name = req.query as { name: string };
        try {

            const getResume = await prisma.resume.findUnique({
                where: { name: name.name as string }
            });
            if (getResume) {
                const convert = convertResume({ resumestr: getResume as unknown as mainResumeStrType }) as mainResumeType;
                res.status(200).json(convert);
                return await prisma.$disconnect();
            } else {
                res.status(400).json({ msg: `could not get: ${name.name}` });
                return await prisma.$disconnect();
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    } else if (req.method === "DELETE") {
        const item = req.query;
        const { id, name } = item as { id: string, name: string };
        if (!id) res.status(404).json({ msg: "unauthorized" });
        const ID = Number(id);
        const delRef = await prisma.resume.delete({
            where: { id: ID },
        });
        if (delRef) {
            res.status(200).json({ id, name });
        } else {
            res.status(400).json({ msg: "was not deleted" });
        };

    } else {
        res.status(404).json({ msg: "not authorized" });
        await prisma.$disconnect();
    }
};

export function convertResume({ resumestr }: { resumestr: mainResumeStrType }): mainResumeType | undefined {
    if (!resumestr) return;
    try {
        const { id, name, user_id, resume, french } = resumestr;
        const _resume: resumeType = JSON.parse(resume) as resumeType;

        const resume_: resumeType = {
            ..._resume,
            id,
            name
        };
        return { id, name, user_id, resume: resume_, french } as mainResumeType
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)

    }
};
