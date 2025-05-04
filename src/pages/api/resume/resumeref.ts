import { getErrorMessage } from "@/components/common/errorBoundary";
import {  mainResumeRefType, resumeRefStrType, resumeRefType } from "@/components/bio/resume/refTypes";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const mainReference = req.body as mainResumeRefType;
        if (!mainReference) return res.status(400).json({ msg: "nothing recieved" });
        const { name,res_name_id, references,user_id,french } = mainReference
       
        try {
            if (!name) return res.status(400).json({ msg: "no name ID" }); await prisma.$disconnect();
            if(res_name_id){
                references.map(ref=>{
                    ref.res_name_id=res_name_id;
                });
            }
            const getref = await prisma.reference.upsert({
                where: { name },
                create: {
                    name: name,
                    user_id,
                    res_name_id,
                    french,
                    reference: JSON.stringify(references),
                },
                update: {
                    res_name_id,
                    french,
                    reference: JSON.stringify(references),
                    
                }
            });
            if (getref) {
                const converts =await convertReference({ ref: getref as unknown as resumeRefStrType });
                res.status(200).json(converts);
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
            const getRef = await prisma.reference.findUnique({
                where: { name: name.name as string }
            });
            if (getRef) {
                const converts = convertSimpleReference({ ref: getRef as unknown as resumeRefStrType }) as mainResumeRefType | undefined;
                if(converts){
                    res.status(200).json(converts);
                    return await prisma.$disconnect();
                }else{
                    res.status(308).json({msg:"issue with the parsing"});
                    return await prisma.$disconnect();
                }
            } else {
                res.status(400).json({ msg: "could not get" });
                return await prisma.$disconnect();
            }
            
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    }else if(req.method==="DELETE"){
            const item=req.query;
            const {id,name}=item as {id:string,name:string};
            if(!id) res.status(404).json({msg:"unauthorized"});
            const ID=Number(id);
            const delRef=await prisma.reference.delete({
                    where:{id:ID},
            });
            if(delRef){
                res.status(200).json({id,name});
            }else{
                res.status(400).json({msg:"was not deleted"});
            };

    } else {
        res.status(404).json({ msg: "not authorized" });
        return await prisma.$disconnect();
    }
};

export async function convertReference({ ref }: { ref: resumeRefStrType }):Promise< mainResumeRefType | undefined> {
    if (!ref) return;
    try {
        const {id,name,reference,res_name_id,french } = ref;
        const _references=JSON.parse(reference) as resumeRefType[];
       const refconvert= _references.map(kv=>{
            if(res_name_id){
                kv.res_name_id=res_name_id;
            };
            return kv;
        });
        await prisma.reference.update({
            where:{id},
            data:{
                reference:JSON.stringify(refconvert)
            }
        });
        
        return {id,name,references:refconvert,french} as unknown as mainResumeRefType
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
    }
};


export  function convertSimpleReference({ ref }: { ref: resumeRefStrType }):mainResumeRefType | undefined {
    if (!ref) return;
    try {
        const {id,name,res_name_id,reference,french } = ref;
        const _references=JSON.parse(reference) as resumeRefType[];
       const refconvert= _references.map(kv=>{
            if(res_name_id){
                kv.res_name_id=res_name_id;
            };
            return kv;
        });
        return {id,name,references:refconvert,res_name_id,french} as unknown as mainResumeRefType
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
    }
};