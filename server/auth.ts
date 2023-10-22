import { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import { env } from "@/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthDataValidator, objectToAuthDataMap } from "@telegram-auth/server";

import { db } from "@/server/db";
import { redirect } from "next/navigation";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(credentials, req) {
        const validator = new AuthDataValidator({
          botToken: `${env.BOT_TOKEN}`,
        });

        const data = objectToAuthDataMap(req.query || {});

        const user = await validator.validate(data);

        if (!user) return null;

        const visitor = {
          id: user.id.toString(),
          username: user.username!,
          name: [user.first_name, user.last_name || ""].join(" "),
          image: user.photo_url,
        };

        const exists = await db.user.findFirst({
          where: {
            id: user.id.toString(),
          },
        });

        if (exists) return visitor;

        await db.user.create({
          data: visitor,
        });

        return visitor;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, //'supersecret' // also in vercel env variables
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    error: "/error",
    newUser: "/registration",
    signOut: "/",
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/");
};
