import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/prismaclient"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hashComp } from "./lib/ultils/bcrypt";

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
                clientId: process.env.GOOGLE_client_ID as string,
                clientSecret: process.env.GOOGLE_client_secret as string,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
    
            }),
            CredentialsProvider({
    
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'log in',
                // The credentials is used to generate a suitable form on the sign in page.
                // You can specify whatever fields you are expecting to be submitted.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    email: { label: "email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
    
                async authorize(credentials) {
                    const cred = credentials
                    if (!cred?.email || !cred?.password) {
                        return null
                    }
                    const user = await prisma.user.findUnique({
                        where: {
                            email: cred.email
                        },
                        select:{
                            id:true,
                            name:true,
                            email:true,
                            username:true,
                            showinfo:true,
                            imgKey:true,
                            bio:true,
                            admin:true,
                            image:true,
                            password:true
                        }
                    });
                    let retUser = user;
                    if (!retUser) {
                        console.log("AUTH.TS:NO USER")
                        await prisma.$disconnect()
                        return null
                    }
                    if (retUser.password) {
                        const check = await hashComp(cred?.password, retUser?.password) ? true : false;
                        console.log("AUTH.TS:","password:",retUser.password,"CHECK",check);
                        if (!check) {
                            await prisma.$disconnect()
                            return null
                        }
                    } else if (cred.email === EMAIL || cred.email === EMAIL2) {
                        retUser = { ...retUser, admin: true }
                    } else {
                        await prisma.$disconnect()
                        return null
                    }
    
                    await prisma.$disconnect();
                    return { ...retUser,password:undefined }
    
                }
    
            }),
  ],
})