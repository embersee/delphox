import { db } from "@/lib/db";
import { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthDataValidator, objectToAuthDataMap } from "@telegram-auth/server";
import { NewUser, users } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      telegram_id: string;
      first_name: string;
      last_name: string;
      registered?: boolean;
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

        const newUser: NewUser = {
          id: user.id.toString(),
          telegram_id: user.id.toString(),
          name: user.username,
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          image: user.photo_url || "",
        };

        const exists = await db.query.users.findFirst({
          where: eq(users.telegram_id, newUser.telegram_id),
        });

        if (exists) return newUser;

        const createNewUser = await db.insert(users).values(newUser);

        if (createNewUser.rowsAffected) {
          console.log(createNewUser.rowsAffected);

          return newUser;
        }

        return null;
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
