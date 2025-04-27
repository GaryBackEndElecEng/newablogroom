import { quoteType,quoteCalcItemType, developDeployType } from "@/components/editor/Types";
import { resumeRefs } from "@/components/bio/resume/referenceData";
import { resume } from "@/components/bio/resume/resumeData";
// import prisma from "@/prisma/prismaclient";
import { quoteArr,deveDeployArr } from "./arrays";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//------NOTE YOU ONLY DUE ONE TABLE AT A TIME!!!!!!!!!!!!!!!-------///
 async function main(){
const arr:quoteCalcItemType[]=quoteArr;
const devDeployArr:developDeployType[]=deveDeployArr;
const resumestr=JSON.stringify(resume);
    const referencestr=JSON.stringify(resumeRefs);

    // await Promise.all(arr.map(async(quote)=>{
    //     await prisma.quote.create({
    //         data:{
    //             name:quote.name,
    //             type:quote.type,
    //             basic:quote.basic,
    //             isPage:quote.isPage,
    //             desc:quote.desc,
    //             time:quote.time,
    //             qty:quote.qty,
    //             dollar:quote.dollar
    //         }
    //     });
    // }));

    // await Promise.all(devDeployArr.map(async(devDeploy)=>{
    //     await prisma.developDeploy.create({
    //         data:{
    //             name:devDeploy.name,
    //             type:devDeploy.type,
    //             basic:devDeploy.basic,
    //             stage:devDeploy.stage,
    //             isPage:devDeploy.isPage,
    //             desc:devDeploy.desc,
    //             time:devDeploy.time,
    //             qty:devDeploy.qty,
    //             dollar:devDeploy.dollar
    //         }
    //     });
    // }));

    await prisma.resume.create({
      data:{
          name:resume.name,
          user_id:"cm51ubmw50000w96kltekqng5",
          resume:resumestr,
          enable:false
      }
  });

  await prisma.reference.create({
      data:{
          name:resume.name,
          user_id:"cm51ubmw50000w96kltekqng5",
          reference:referencestr
      }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })