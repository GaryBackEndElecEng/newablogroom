import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/prismaclient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { hashComp } from "@/lib/ultils/bcrypt";
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;




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
            if (user?.email) {
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
                        //can create account id db
                    }
                }
                await prisma.$disconnect();
            }
            return token
        },
        session: async ({ session, user, token }) => {
            if (token && session?.user?.email) {
                session.user.email = token.email;

                if (user && token.id) {

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
                const cred = credentials;
                //hascsrftoken in credentials
                if (!cred?.email || !cred?.password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: cred.email
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        showinfo: true,
                        imgKey: true,
                        bio: true,
                        admin: true,
                        image: true,
                        password: true
                    }
                });
                let retUser = user;
                if (!retUser) {
                    // console.log("OPTIONS: no user")
                    await prisma.$disconnect()
                    return null
                }
                if (retUser.password) {
                    const check = await hashComp(cred?.password, retUser?.password);
                    if (!check) {
                        await prisma.$disconnect()
                        return null
                    }
                } else {
                    await prisma.$disconnect()
                    return null
                };
                if (cred.email === EMAIL || cred.email === EMAIL2) {
                    retUser = { ...retUser, admin: true }
                };

                await prisma.$disconnect();
                return { ...retUser, password: undefined }

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