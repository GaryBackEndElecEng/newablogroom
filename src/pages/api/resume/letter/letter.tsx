import { getErrorMessage } from "@/components/common/errorBoundary";
import { letterType, mainIntroLetterType } from "@/components/bio/resume/refTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const mainLetter = req.body as mainIntroLetterType;
        if (!mainLetter) return res.status(400).json({ msg: "nothing recieved" });
        const { id, name, res_name_id, letter, user_id } = mainLetter;

        if (name && user_id && typeof (name) === "string" && typeof (user_id) === "string") {
            try {

                if (res_name_id) {
                    letter.res_name_id = res_name_id;
                }
                if (id !== 0) {

                    const updateLetter = await prisma.letter.update({
                        where: { id, name },
                        data: {
                            res_name_id,
                            letter: JSON.stringify(letter)
                        }
                    });
                    if (updateLetter) {
                        const convert = { ...mainLetter, id: updateLetter.id };
                        res.status(200).json(convert);
                        return await prisma.$disconnect()

                    } else {
                        res.status(400).json({ msg: "could not update letter" });
                        return await prisma.$disconnect();
                    }
                } else {
                    const newLetter = await prisma.letter.create({
                        data: {
                            name,
                            user_id,
                            res_name_id,
                            letter: JSON.stringify(letter)
                        },
                    });
                    if (newLetter) {
                        const convert = { ...mainLetter, id: newLetter.id };
                        res.status(200).json(convert);
                        return await prisma.$disconnect()
                    } else {
                        res.status(400).json({ msg: "could not create new letter" });
                        return await prisma.$disconnect();
                    }
                };

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                return await prisma.$disconnect();
            }

        } else {
            res.status(400).json({ msg: " user_id and or name is missing" });
            await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        const name = req.query as { name: string };
        try {

            const getLetter = await prisma.letter.findUnique({
                where: { name: name.name as string }
            });
            if (getLetter) {
                const letter = JSON.parse(getLetter.letter as string) as letterType
                const convert = { ...getLetter, letter } as mainIntroLetterType;
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
        const { id } = item as { id: string };
        if (!id) res.status(404).json({ msg: "unauthorized" });
        const ID = Number(id);
        const delRef = await prisma.letter.delete({
            where: { id: ID },
        });
        if (delRef) {
            res.status(200).json({ id, name: delRef.name });
        } else {
            res.status(400).json({ msg: "was not deleted" });
        };

    } else {
        res.status(404).json({ msg: "not authorized" });
        await prisma.$disconnect();
    }
};

