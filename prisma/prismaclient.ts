
// https://github.com/prisma/prisma/discussions/10037
import { PrismaClient } from "@prisma/client"

const awsDB=process.env.DATABASE_URL_AWS as string;
const local=process.env.localDB as string;
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasourceUrl: awsDB
  })
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      datasourceUrl: local
    })
  }
  prisma = globalWithPrisma.prisma
}


export default prisma


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma2 = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma



//THIS IS NOT USED
// prisma.$use(async (params, next) => {
//   if (params.action == "create" && params.model == "Account") {
//     delete params.args.data["not-before-policy"]
//   }

//   const result = await next(params)
//   // See results here
//   return result
// })