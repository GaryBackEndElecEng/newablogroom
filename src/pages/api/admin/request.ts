import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {  userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
// import {  getUserImage } from "@/lib/awsFunctions";
// import { hashComp } from "@/lib/ultils/bcrypt";

const prisma = new PrismaClient();
const EMAIL=process.env.EMAIL as string;
const EMAIL2=process.env.EMAIL2 as string;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const {email,id} = req.query as unknown as userType;
        if (email) {

            try {
                const user= await prisma.user.findUnique({
                    where:{id},
                });
                const check=email===EMAIL || email===EMAIL2 ? true:false;
                if(user && check && user.email===email){

                    const user_={...user,admin:true};
                    res.status(200).json({user:user_});
                }else{
                    res.status(400).json({msg:"unauthorized"})

                }
              

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `unauthorized` });
            await prisma.$disconnect()
        }
    }



}