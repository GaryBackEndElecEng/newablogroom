import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// import Providers from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// const logo = `${process.env.NEXT_PUBLIC_aws_static}/logo.png`;
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

const prisma = new PrismaClient();
// let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient({
//     datasourceUrl: process.env.DATABASE_URL_AWS
//   });
// } else {
//   prisma = new PrismaClient({
//     datasourceUrl: process.env.DATABASE_URL_AWS
//   });
// }
// const baseurl=httpUrl();

export async function hashKey(pswd: string) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(pswd, salt)
}
export async function hashComp(pswd: string, hash: string) {
    const comp = bcrypt.compare(pswd, hash);
    return comp
}

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        signIn: async ({ account, credentials, }) => {
            //activate only after the signin is successful
            if (credentials) {
                return true
            } else if (account) return true
            return false

        },
        redirect: async ({ url, baseUrl }) => {
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },

        jwt: async ({ token, user, account }) => {
            // console.log("token from authOptions",token,user)// works jwt executes first before session
            if (user && user.email) {
                const tUser = await prisma.user.findUnique({
                    where: { email: user.email as string }
                });
                const TUser = tUser;
                if (TUser) {
                    if ((TUser.email === EMAIL || TUser.email === EMAIL2)) {
                        TUser.admin = true;
                    };

                    token.email = TUser.email;
                    token.id = TUser.id;
                    token.username = TUser.name ? TUser.name : "";
                    if (account) {
                        token.accessToken = account.accessToken

                    }
                }
                await prisma.$disconnect();
            }
            return token
        },
        session: async ({ session, user, token }) => {
            if (token && session.user && session.user.email) {
                const endDate = new Date(2025, 12, 1).getTime();
                const today = Date.now();
                // const diff = endDate - today
                session.user.email = token.email;
                if (user && user.id && token && token.accessToken) {
                    await prisma.session.upsert({
                        where: {
                            userId: user.id
                        },
                        include: {
                            user: true
                        },
                        create: {
                            userId: user.id,
                            accessToken: token.accessToken as string,
                            expires: new Date(endDate - today),
                            sessionToken: token.accessToken as string,

                        },
                        update: {
                            accessToken: token.accessToken as string,
                            expires: (endDate - today).toString(),
                            sessionToken: token.accessToken as string
                        }
                    });
                    await prisma.$disconnect()
                    session = { ...session, user: user }
                }
            }
            return session;
        },


    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 //30 days

    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_client_ID as string,
            clientSecret: process.env.GOOGLE_client_secret as string,
            // authorization: {
            //   params: {
            //     prompt: "consent",
            //     access_type: "offline",
            //     response_type: "code"
            //   }
            // }

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
                    }
                });
                let retUser = user;
                if (!retUser) {
                    await prisma.$disconnect()
                    return null
                }
                if (retUser.password) {
                    const check = await hashComp(cred?.password, retUser?.password) ? true : false;
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
                return { id: retUser.id + "", email: retUser.email, name: retUser.name, admin: retUser.admin }

            }

        }),
        // ...add more providers here
    ],
    pages: {
        error: 'auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    debug: process.env.NODE_ENV === "development"

}
export default authOptions;